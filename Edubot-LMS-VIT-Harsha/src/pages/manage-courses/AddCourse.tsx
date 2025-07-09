import React, { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { ArrowUp, ArrowDown, MoveUp, MoveDown, Trash2, Pencil } from 'lucide-react';

const AddCoursePage: React.FC = () => {
  const router = useRouter();

  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [skillsGain, setSkillsGain] = useState('');
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [modules, setModules] = useState<string[]>([
    'Introduction to Java and the Eclipse IDE',
    'Algorithm analysis',
    'Abstract data types, Stacks, Linked lists',
    'Queues, Introduction to Trees',
    'Binary Trees, Binary Search Trees',
    'Object-Oriented Concepts',
    'Databases',
    'Web Development',
    'APIs and Integration',
    'Testing & Debugging',
    'Final Project'
  ]);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(null);

  const [errors, setErrors] = useState<{
    courseName?: string;
    courseId?: string;
    modules?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!courseName.trim()) newErrors.courseName = 'Course name is required';
    if (!courseId.trim()) newErrors.courseId = 'Course ID is required';
    if (modules.length === 0) newErrors.modules = 'At least one module is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = () => {
  if (!validate()) return;

  const courseData = {
    courseName,
    courseId,
    description,
    skillsGain,
    duration,
    isActive,
    modules: modules.map((module, index) => ({
      index: index + 1,
      name: module
    }))
  };

  console.log("✅ COURSE SUBMISSION DETAILS:");
  console.log("Course Name:", courseData.courseName);
  console.log("Course ID:", courseData.courseId);
  console.log("Description:", courseData.description);
  console.log("Skills Gain:", courseData.skillsGain);
  console.log("Duration:", courseData.duration);
  console.log("Status:", courseData.isActive ? "Active" : "Inactive");
  console.log("Modules:");
  courseData.modules.forEach((mod) => {
    console.log(`  ${mod.index}. ${mod.name}`);
  });

  alert('Course submitted successfully!');
};


  const handleAddModule = () => {
    const newModule = prompt('Enter module name:');
    if (newModule && newModule.trim()) {
      setModules([...modules, newModule.trim()]);
      setErrors((prev) => ({ ...prev, modules: undefined }));
    }
  };

  const moveModule = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    if (selectedModuleIndex === null) return;
    const index = selectedModuleIndex;
    const newModules = [...modules];
    const item = newModules[index];

    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === newModules.length - 1) ||
      (direction === 'top' && index === 0) ||
      (direction === 'bottom' && index === newModules.length - 1)
    )
      return;

    newModules.splice(index, 1);
    if (direction === 'up') {
      newModules.splice(index - 1, 0, item);
      setSelectedModuleIndex(index - 1);
    } else if (direction === 'down') {
      newModules.splice(index + 1, 0, item);
      setSelectedModuleIndex(index + 1);
    } else if (direction === 'top') {
      newModules.unshift(item);
      setSelectedModuleIndex(0);
    } else if (direction === 'bottom') {
      newModules.push(item);
      setSelectedModuleIndex(newModules.length - 1);
    }

    setModules(newModules);
  };

  const handleEditModule = (index: number) => {
    const moduleName = modules[index];
    router.navigate({
      to: '/manage-courses/Add/AddMaterials',
      search: {
        moduleIndex: String(index),
        moduleName,
      },
    });
  };

  const handleDeleteModule = (index: number) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      const newModules = modules.filter((_, i) => i !== index);
      setModules(newModules);
      if (selectedModuleIndex === index) setSelectedModuleIndex(null);
      else if (selectedModuleIndex !== null && selectedModuleIndex > index)
        setSelectedModuleIndex(selectedModuleIndex - 1);
    }
  };

  return (
    <div className="tw-pt-[121px] tw-px-4 md:tw-pl-[237px] md:tw-pr-8 tw-font-['Montserrat'] tw-space-y-4  " >
      <div className="tw-bg-white tw-rounded-md tw-shadow-md tw-p-4 md:tw-p-6 tw-space-y-4">
        {/* Course Name */}
        <div>
          <label className="tw-font-medium">
            Course Name <span className="tw-text-red-500">*</span>
          </label>
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="tw-w-full tw-p-2 tw-mt-1 tw-border tw-border-gray-300 tw-rounded"
          />
          {errors.courseName && <p className="tw-text-red-500 tw-text-sm">{errors.courseName}</p>}
        </div>

        {/* Course ID */}
        <div>
          <label className="tw-font-medium">
            Create Course ID <span className="tw-text-red-500">*</span>
          </label>
          <input
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="tw-w-full tw-p-2 tw-mt-1 tw-border tw-border-gray-300 tw-rounded"
          />
          {errors.courseId && <p className="tw-text-red-500 tw-text-sm">{errors.courseId}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="tw-font-medium">
            Description <span className="tw-text-gray-400">(Optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="tw-w-full tw-p-2 tw-mt-1 tw-border tw-border-gray-300 tw-rounded"
          />
        </div>

        {/* Skills Gain */}
        <div>
          <label className="tw-font-medium">Skills Gain</label>
          <textarea
            value={skillsGain}
            onChange={(e) => setSkillsGain(e.target.value)}
            className="tw-w-full tw-p-2 tw-mt-1 tw-border tw-border-gray-300 tw-rounded"
          />
        </div>

        {/* Duration and Active Status */}
        <div className="tw-flex  tw-gap-4 tw-items-center">
          <div className="tw-min-w-[220px]">
  <label className="tw-font-medium tw-block tw-mb-1">
    Course Duration <span className="tw-text-gray-400">(Optional)</span>
  </label>
  <select
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    className="tw-w-[335px] tw-p-2 tw-border tw-border-gray-300 tw-rounded"
  >
    <option value="">Select</option>
    <option value="4 weeks">4 weeks</option>
    <option value="8 weeks">8 weeks</option>
  </select>
</div>


          <div className="tw-min-w-[200px] tw-flex tw-gap-6 tw-ml-40 tw-mt-6">
            <label>
              <input type="checkbox" checked={isActive} onChange={() => setIsActive(true)} /> Active
            </label>
            <label>
              <input type="checkbox" checked={!isActive} onChange={() => setIsActive(false)} /> Inactive
            </label>
          </div>
        </div>

        {/* Add Module Button */}
        <p className="tw-text-sm">You can create as many modules as required in it, click the button below.</p>
        <button
          className="tw-bg-white tw-border tw-border-[#1A177A] tw-text-[#1A177A] tw-rounded tw-px-4 tw-py-1.5 tw-font-bold tw-w-[120px]"
          onClick={handleAddModule}
        >
          Create
        </button>

<div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-5">
  {/* Modules Section */}
<div className="tw-w-full md:tw-w-[82%] lg:tw-w-[88%] xl:tw-w-[7000px] tw-border tw-rounded tw-p-4 tw-bg-gray-100 tw-max-h-60 tw-overflow-y-auto">
  <div className="tw-border-b tw-border-gray-400 tw-pb-1">
    <strong>Modules <span className="tw-text-red-500">*</span></strong>
  </div>
  {errors.modules && <p className="tw-text-red-500 tw-text-sm">{errors.modules}</p>}
  <ul className="tw-list-none tw-mt-2">
    {modules.map((mod, idx) => (
      <li
        key={idx}
        onClick={() => setSelectedModuleIndex(idx)}
        className={`tw-p-2 tw-mb-1 tw-border-b tw-border-gray-300 tw-flex tw-justify-between tw-items-center tw-cursor-pointer ${selectedModuleIndex === idx ? 'tw-bg-blue-100' : ''}`}
      >
        <span className="tw-break-words tw-max-w-[75%] sm:tw-max-w-[85%]">{idx + 1}. {mod}</span>
        <span className="tw-flex tw-gap-2">
          <button onClick={() => handleEditModule(idx)}>
            <Pencil size={16} className="tw-text-gray-700 hover:tw-text-blue-500" />
          </button>
          <button onClick={() => handleDeleteModule(idx)}>
            <Trash2 size={16} className="tw-text-gray-700 hover:tw-text-red-500" />
          </button>
        </span>
      </li>
    ))}
  </ul>
</div>


  {/* Reordering Buttons */}
 <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-w-full max-md:tw-mt-3 md:tw-flex md:tw-flex-col md:tw-ml-4 md:tw-mt-6">
  {[{ label: 'Top', action: 'top' }, { label: 'Up', action: 'up' }, { label: 'Down', action: 'down' }, { label: 'Bottom', action: 'bottom' }].map(({ label, action }) => {
    const Icon = label === 'Top' ? MoveUp : label === 'Bottom' ? MoveDown : label === 'Up' ? ArrowUp : ArrowDown;
    const isCircle = label === 'Top' || label === 'Bottom';
    return (
      <button
        key={label}
        className="tw-flex tw-items-center tw-gap-2 tw-bg-none tw-border-none tw-p-0 tw-cursor-pointer"
        onClick={() => moveModule(action as any)}
      >
        <span className="tw-bg-blue-100 tw-w-8 tw-h-8 tw-rounded tw-flex tw-justify-center tw-items-center">
          {isCircle ? (
            <span className="tw-border tw-border-black tw-rounded-full tw-p-[1px] tw-flex tw-items-center tw-justify-center">
              <Icon size={12} strokeWidth={1.25} />
            </span>
          ) : (
            <Icon size={14} strokeWidth={1.5} />
          )}
        </span>
        <span className="tw-text-xs">{label}</span>
      </button>
    );
  })}
</div>

</div>



        {/* Submit Button */}
        <div className="tw-mt-6">
          <button
            onClick={handleSubmit}
            className="tw-bg-[#1A177A] tw-text-white tw-py-2 tw-px-6 tw-rounded tw-font-bold tw-w-full md:tw-w-[160px]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;