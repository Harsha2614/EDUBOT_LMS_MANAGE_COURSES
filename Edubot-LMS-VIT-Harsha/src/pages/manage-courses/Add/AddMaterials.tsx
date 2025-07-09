import React, { useState } from 'react';
import { Pencil, Trash2, Eye, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSearch } from '@tanstack/react-router';
import { Copy } from 'lucide-react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Tick from '@/assets/Tick.png';
import upload from '@/assets/upload.png';
const AddMaterials: React.FC = () => {
  const { moduleIndex, moduleName } = useSearch({
    from: '/manage-courses/Add/AddMaterials',
  });
  const [title, setTitle] = useState(moduleName);
  const [summary, setSummary] = useState('');
  const [githubOrg, setGithubOrg] = useState('');
  const [courseName, setCourseName] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [platformType, setPlatformType] = useState('Test');
  const [materialsList, setMaterialsList] = useState([
  { name: 'studymaterial.doc', date: '22/05/2024', size: '3.1 MB' },
  { name: 'studymaterial.doc', date: '22/05/2024', size: '3.1 MB' },
  { name: 'studymaterial.doc', date: '22/05/2024', size: '3.1 MB' },
  { name: 'studymaterial.doc', date: '22/05/2024', size: '3.1 MB' },
]);
const [editingMaterialIndex, setEditingMaterialIndex] = useState<number | null>(null);
const [editingMaterial, setEditingMaterial] = useState({
  name: '',
  date: '',
  size: '',
});
  const [linkList, setLinkList] = useState([
    'https://youtu.be/dQw4w9WgXcQ',
    'https://youtu.be/2Z4m4lnjxkY',
    'https://youtu.be/9bZkp7q19f0',
  ]);
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
  const [editingLinkValue, setEditingLinkValue] = useState('');
  const [assignmentList, setAssignmentList] = useState([
    { name: 'assignment.doc', date: '22/05/2024', size: '3.1 MB' },
    { name: 'assignment.doc', date: '22/05/2024', size: '3.1 MB' },
    { name: 'assignment.doc', date: '22/05/2024', size: '3.1 MB' },
  ]);
  const [editingAssignmentIndex, setEditingAssignmentIndex] = useState<number | null>(null);
  const [editingAssignment, setEditingAssignment] = useState({ name: '', date: '', size: '' });
  const [showModal, setShowModal] = useState(false);
  const [newSectionType, setNewSectionType] = useState('');
  const platformLink = `https://github.com/${githubOrg}/${assignmentName}`;
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newMaterials = Array.from(e.target.files).map((file) => ({
        name: file.name,
        date: new Date().toLocaleDateString('en-GB'),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setMaterialsList((prev) => [...prev, ...newMaterials]);
    }
  };

  const handleLinkFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const newLinks = Array.from(files).map((file) => file.name); // assuming file name is the "link"
  setLinkList((prev) => [...prev, ...newLinks]);
};

const handleAssignmentFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const newAssignments = Array.from(files).map((file) => ({
    name: file.name,
    date: new Date().toLocaleDateString('en-GB'),
    size: `${(file.size / 1024).toFixed(1)} KB`, // or include type: file.type
  }));

  setAssignmentList((prev) => [...prev, ...newAssignments]);
};
const [showAddLinkModal, setShowAddLinkModal] = useState(false);
const [linkInput, setLinkInput] = useState('');
const [showCreateSectionModal, setShowCreateSectionModal] = useState(false);
const [selectedSection, setSelectedSection] = useState('');
const [showUploadModal, setShowUploadModal] = useState(false);
const [showAssignmentUploadModal, setShowAssignmentUploadModal] = useState(false);
const [showReadingSuccess, setShowReadingSuccess] = useState(false);
const [showLinkSuccess, setShowLinkSuccess] = useState(false);
const [showAssignmentSuccess, setShowAssignmentSuccess] = useState(false);
const [linkError, setLinkError] = useState('');


  return (
    <div
  className="tw-absolute tw-bg-white tw-rounded-md tw-shadow-md tw-font-['Montserrat']
    tw-w-[968px] tw-top-[122px] tw-left-[235px] 
    max-lg:tw-w-full max-lg:tw-left-0 max-lg:tw-top-[100px] max-lg:tw-px-4
  "
>

      <div
  className="
    tw-p-8 tw-h-full tw-overflow
    max-lg:tw-p-4
  "
>


       {/* Title */}
<div
  className="
    tw-w-[687px] tw-flex tw-flex-col tw-gap-[8px] tw-mb-4
    max-lg:tw-w-full
  "
>
  <label className="tw-text-sm tw-font-medium">Title</label>
  <Input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="
      tw-h-[32px] tw-bg-white tw-border tw-border-gray-300 tw-rounded-[4px] tw-text-sm
      tw-w-full sm:tw-w-[687px] lg:tw-w-[900px]
    "
  />
</div>


        {/* Summary */}
        <div >
          <label className="tw-block tw-text-sm tw-font-medium ">
            Summary <span className="tw-text-gray-400">(Optional)</span>
          </label>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="tw-mt-1 tw-bg-white tw-border tw-border-gray-300 tw-rounded"
          />
          <p className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-mb-4">Maximum 100 character</p>
        </div>

        {/* Platform Link */}
        <h3 className="tw-font-medium">Create Platform Link</h3>
<div className="tw-bg-gray-100 tw-rounded-md tw-p-4 tw-space-y-4 tw-mb-6">
  <div className="tw-grid md:tw-grid-cols-2 tw-gap-4">
    <div>
      <Label>Github Organization Name</Label>
      <Input
        value={githubOrg}
        onChange={(e) => setGithubOrg(e.target.value)}
        className="tw-border tw-border-black tw-rounded"
      />
    </div>
    <div>
      <Label>Course Name</Label>
      <Input
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="tw-border tw-border-gray-400 tw-rounded"
      />
    </div>
    <div>
      <Label>Github Assignment Name</Label>
      <Input
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        className="tw-border tw-border-gray-300 tw-rounded"
      />
    </div>
    <div>
      <Label>Platform Type</Label>
      <select
        value={platformType}
        onChange={(e) => setPlatformType(e.target.value)}
        className="tw-mt-1 tw-w-full tw-bg-white tw-border tw-border-gray-300 tw-rounded tw-p-2"
      >
        <option value="Test">Test</option>
        <option value="Lab">Lab</option>
        <option value="Assignment">Assignment</option>
      </select>
    </div>
  </div>

  <div>
    <Label>Platform link</Label>
    <div className="tw-relative">
      <Input
        value={platformLink}
        readOnly
        className="tw-pr-10 tw-border tw-border-gray-300 tw-rounded"
      />
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(platformLink);
          alert('Platform link copied!');
        }}
        className="tw-absolute tw-top-1/2 tw-right-2 tw-transform -tw-translate-y-1/2 tw-text-gray-600 hover:tw-text-black"
      >
        <Copy size={16} />
      </button>
    </div>
  </div>
</div>

        <div className="tw-flex tw-gap-4">
          <label className="tw-flex tw-items-center tw-gap-2">
            <input type="checkbox" />
            Auto Analysis
          </label>
          <label className="tw-flex tw-items-center tw-gap-2">
            <input type="checkbox" />
            Test Cases
          </label>
        </div>

        {/* Upload Reading Materials */}
        <section>
          <h2 className="tw-font-medium tw-text-base tw-mb-3 tw-mt-3">Upload Reading Materials</h2>
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
            <label
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 scroll to top
    setShowUploadModal(true); // 👈 open modal
  }}
  className="tw-w-[92px] tw-h-[28px] tw-py-[8px] tw-px-[10px] tw-border tw-border-[0.5px] tw-border-indigo-800 tw-text-indigo-800 tw-rounded-[6px] tw-flex tw-items-center tw-gap-[8px] tw-cursor-pointer"
>
  <Upload className="tw-w-[8px] tw-h-[11px]" />
  <span className="tw-w-[56px] tw-h-[12px] tw-font-medium tw-text-[10px] tw-leading-[1] tw-tracking-[0] tw-font-['Montserrat'] tw-whitespace-nowrap">
    Choose file
  </span>
</label>


{showUploadModal && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/50 tw-flex tw-justify-center tw-items-center">
    <div className="tw-bg-white tw-rounded-[6px] tw-w-[400px] tw-shadow-lg tw-p-4 tw-text-center tw-font-['Montserrat']">
      {/* Header */}
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-3">
        <h3 className="tw-text-[14px] tw-font-semibold">Upload File</h3>
        <button
          onClick={() => setShowUploadModal(false)}
          className="tw-text-gray-500 tw-text-xl"
        >
          ×
        </button>
      </div>

      {/* Dashed Upload Box */}
     

<div className="tw-border tw-border-dashed tw-border-indigo-800 tw-rounded-[6px] tw-p-4 tw-mb-4 tw-bg-gray-100">
  <img
      src={upload}
      alt="Upload"
      className="tw-w-60px] tw-h-[60px] tw-mx-auto tw-mb-2"
    />
  <label className="tw-cursor-pointer tw-text-indigo-800 tw-font-medium tw-text-[12px]">
    <span className="tw-font-[600] tw-font-montserrat tw-text-[15px] tw-leading-[100%] tw-tracking-[0%] tw-text-center tw-underline tw-decoration-solid tw-decoration-[0%] tw-decoration-[0.5px]">
  Browse File
</span>

    <input
      type="file"
      onChange={handleAssignmentFileUpload}
      className="tw-hidden"
      multiple
    />
  </label>
  <p className="tw-text-[12px] tw-text-gray-500 mt-1">
    Only <em>Doc, ppt and Pdfs</em> format is allowed
  </p>
</div>


      {/* Buttons */}
      <div className="tw-flex tw-justify-center tw-gap-3">
        <button
          onClick={() => setShowUploadModal(false)}
          className="tw-border tw-border-indigo-800 tw-text-indigo-800 tw-text-[12px] tw-rounded tw-px-4 tw-py-[4px]"
        >
          Cancel
        </button>
        <button
 onClick={() => {
  setShowUploadModal(false);
  setTimeout(() => {
    setShowReadingSuccess(true);
  }, 300);
}}

  className="tw-bg-indigo-800 tw-text-white tw-text-[12px] tw-rounded tw-px-4 tw-py-[4px]"
>
  Upload
</button>

      </div>
    </div>
  </div>
)}

{showReadingSuccess && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/40 tw-flex tw-items-center tw-justify-center">
    <div className="tw-bg-white tw-rounded-md tw-shadow-lg   tw-w-[326px] tw-h-[257px] tw-rounded-[4px] tw-p-[16px] tw-gap-[20px] tw-p-6 tw-text-center tw-relative">
      <button
        onClick={() => setShowReadingSuccess(false)}
        className="tw-absolute tw-top-2 tw-right-3 tw-text-gray-400 tw-text-lg"
      >
        ×
      </button>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
        <div className="tw-w-24 tw-h-24 tw-rounded-full tw-overflow-hidden">
          <img src={Tick} alt="Success" className="tw-w-full tw-h-full tw-object-contain" />
        </div>
        <h3 className="tw-font-semibold tw-text-lg">Completed</h3>
        <p className=" tw-text-sm tw-font-['Montserrat']">The Material has been added successfully.</p>
        <Button
          className="tw-bg-indigo-900 tw-text-white tw-px-6"
          onClick={() => setShowReadingSuccess(false)}
        >
          Continue
        </Button>
      </div>
    </div>
  </div>
)}
            <span className="tw-text-sm tw-text-gray-500">Accepted file types: Doc, ppt, and Pdfs</span>
          </div>

          <div className="tw-max-h-[200px] tw-overflow-y-auto tw-overflow-x-auto tw-rounded-md tw-border">
            <table className="tw-w-full tw-text-sm">
              <thead>
                <tr className="tw-bg-gray-100 tw-text-left">
                  <th className="tw-px-4 tw-py-2 tw-border">S no.</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Name</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Last modified</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Size & format</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Action</th>
                </tr>
              </thead>
              <tbody>
                {materialsList.map((mat, index) => (
                  <tr key={index} className="tw-bg-gray-100">
                    <td className="tw-px-4 tw-py-2 tw-border">{String(index + 1).padStart(2, '0')}</td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingMaterialIndex === index ? (
                        <Input
                          value={editingMaterial.name}
                          onChange={(e) =>
                            setEditingMaterial({ ...editingMaterial, name: e.target.value })
                          }
                        />
                      ) : (
                        mat.name
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingMaterialIndex === index ? (
                        <Input
                          type="date"
                          value={editingMaterial.date}
                          onChange={(e) =>
                            setEditingMaterial({ ...editingMaterial, date: e.target.value })
                          }
                        />
                      ) : (
                        mat.date
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingMaterialIndex === index ? (
                        <Input
                          value={editingMaterial.size}
                          onChange={(e) =>
                            setEditingMaterial({ ...editingMaterial, size: e.target.value })
                          }
                        />
                      ) : (
                        mat.size
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      <div className="tw-flex tw-gap-2">
                        {editingMaterialIndex === index ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              const updated = [...materialsList];
                              updated[index] = editingMaterial;
                              setMaterialsList(updated);
                              setEditingMaterialIndex(null);
                            }}
                          >
                            Save
                          </Button>
                        ) : (
                          <>
                            <Pencil
                              size={16}
                              className="tw-cursor-pointer"
                              onClick={() => {
                                setEditingMaterialIndex(index);
                                setEditingMaterial(mat);
                              }}
                            />
                            <Trash2
                              size={16}
                              className="tw-cursor-pointer"
                              onClick={() => {
                                const updated = materialsList.filter((_, i) => i !== index);
                                setMaterialsList(updated);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add Links */}
        <section>
          <h2 className="tw-font-medium tw-text-base tw-mb-3 tw-mt-4">Add Links</h2>
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2 ">
          <label
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll up
    setShowAddLinkModal(true); // open modal
  }}
  className="tw-w-[92px] tw-h-[28px] tw-py-[8px] tw-px-[10px] tw-border tw-border-[0.5px] tw-border-indigo-800 tw-text-indigo-800 tw-rounded-[6px] tw-flex tw-items-center tw-gap-[8px] tw-cursor-pointer"
>
  <Upload className="tw-w-[8px] tw-h-[11px]" />
  <span className="tw-w-[56px] tw-h-[12px] tw-font-medium tw-text-[10px] tw-leading-[1] tw-tracking-[0] tw-font-['Montserrat'] tw-whitespace-nowrap">
    Choose file
  </span>
</label>

{showAddLinkModal && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/50 tw-flex tw-justify-center tw-items-center">
    <div className="tw-bg-white tw-rounded-md tw-w-[320px] tw-shadow-lg tw-p-4">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h3 className="tw-text-lg tw-font-semibold">Add Links</h3>
        <button onClick={() => setShowAddLinkModal(false)} className="tw-text-gray-500 tw-text-xl">×</button>
      </div>

      <div className="tw-border-2 tw-border-dashed tw-border-indigo-800 tw-rounded-md tw-p-4 tw-text-center">
        <input
          type="text"
          placeholder="Paste your link here"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          className="tw-w-full tw-text-center tw-text-sm tw-text-gray-700 tw-outline-none tw-bg-transparent tw-placeholder-gray-400"
        />
      </div>

      <div className="tw-flex tw-justify-end tw-gap-3 tw-mt-4">
        <button
          onClick={() => setShowAddLinkModal(false)}
          className="tw-border tw-border-indigo-800 tw-rounded tw-px-4 tw-py-1.5 tw-text-indigo-800"
        >
          Cancel
        </button>
        <button
 onClick={() => {
  if (linkInput.trim()) {
    setLinkList((prev) => [...prev, linkInput.trim()]);
    setLinkInput('');
    setShowAddLinkModal(false);
    setShowLinkSuccess(true);  // ✅
  }
}}

  className="tw-bg-indigo-800 tw-text-white tw-rounded tw-px-4 tw-py-1.5"
>
  Upload
</button>

      </div>
    </div>
  </div>
)}

{showLinkSuccess && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/40 tw-flex tw-items-center tw-justify-center">
    <div className="tw-bg-white tw-rounded-md tw-shadow-lg   tw-w-[326px] tw-h-[257px] tw-rounded-[4px] tw-p-[16px] tw-gap-[20px] tw-p-6 tw-text-center tw-relative">
      <button
        onClick={() => setShowLinkSuccess(false)}
        className="tw-absolute tw-top-2 tw-right-3 tw-text-gray-400 tw-text-lg"
      >
        ×
      </button>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
        <div className="tw-w-24 tw-h-24 tw-rounded-full tw-overflow-hidden">
          <img src={Tick} alt="Success" className="tw-w-full tw-h-full tw-object-contain" />
        </div>
        <h3 className="tw-font-semibold tw-text-lg">Completed</h3>
        <p className=" tw-text-sm tw-font-['Montserrat']">The Link has been added successfully.</p>
        <Button
          className="tw-bg-indigo-900 tw-text-white tw-px-6"
          onClick={() => setShowLinkSuccess(false)}
        >
          Continue
        </Button>
      </div>
    </div>
  </div>
)}
            <span className="tw-text-sm tw-text-gray-500">Accepted link from : Web source and youtube</span>
          </div>

          <div className="tw-max-h-[200px] tw-overflow-y-auto tw-overflow-x-auto tw-rounded-md tw-border">
            <table className="tw-w-full tw-text-sm">
              <thead className="tw-bg-gray-100 tw-text-left">
                <tr>
                  <th className="tw-px-4 tw-py-2 tw-border">S.no</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Link</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Last Modified</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Action</th>
                </tr>
              </thead>
              <tbody>
                {linkList.map((link, index) => (
                  <tr key={index} className="tw-bg-gray-100">
                    <td className="tw-px-4 tw-py-2 tw-border">{String(index + 1).padStart(2, '0')}</td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingLinkIndex === index ? (
                        <Input
                          value={editingLinkValue}
                          onChange={(e) => setEditingLinkValue(e.target.value)}
                        />
                      ) : (
                        link
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">{new Date().toLocaleDateString('en-GB')}</td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      <div className="tw-flex tw-gap-2">
                        {editingLinkIndex === index ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              const updated = [...linkList];
                              updated[index] = editingLinkValue;
                              setLinkList(updated);
                              setEditingLinkIndex(null);
                            }}
                          >
                            Save
                          </Button>
                        ) : (
                          <>
                            <Pencil
                              size={16}
                              className="tw-cursor-pointer"
                              onClick={() => {
                                setEditingLinkIndex(index);
                                setEditingLinkValue(link);
                              }}
                            />
                            <Trash2
                              size={16}
                              className="tw-cursor-pointer"
                              onClick={() => {
                                const updated = linkList.filter((_, i) => i !== index);
                                setLinkList(updated);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add Assignments */}
        <section>
          <h2 className="tw-font-medium tw-text-base tw-mb-3 tw-mt-4">Add Assignments</h2>
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3">
            
          <label
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
    setShowAssignmentUploadModal(true); // open modal
  }}
  className="tw-w-[92px] tw-h-[28px] tw-py-[8px] tw-px-[10px] tw-border tw-border-[0.5px] tw-border-indigo-800 tw-text-indigo-800 tw-rounded-[6px] tw-flex tw-items-center tw-gap-[8px] tw-cursor-pointer"
>
  <Upload className="tw-w-[8px] tw-h-[11px]" />
  <span className="tw-w-[56px] tw-h-[12px] tw-font-medium tw-text-[10px] tw-leading-[1] tw-tracking-[0] tw-font-['Montserrat'] tw-whitespace-nowrap">
    Choose file
  </span>
</label>

{showAssignmentUploadModal && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/50 tw-flex tw-justify-center tw-items-center">
    <div className="tw-bg-white tw-rounded-[6px] tw-w-[400px] tw-shadow-lg tw-p-4 tw-text-center tw-font-['Montserrat']">
      {/* Header */}
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-3">
        <h3 className="tw-text-[14px] tw-font-semibold">Upload File</h3>
        <button
          onClick={() => setShowAssignmentUploadModal(false)}
          className="tw-text-gray-500 tw-text-xl"
        >
          ×
        </button>
      </div>

      {/* Dashed Upload Box */}
     

<div className="tw-border tw-border-dashed tw-border-indigo-800 tw-rounded-[6px] tw-p-4 tw-mb-4 tw-bg-gray-100">
 <img
      src={upload}
      alt="Upload"
      className="tw-w-60px] tw-h-[60px] tw-mx-auto tw-mb-2"
    />
  <label className="tw-cursor-pointer tw-text-indigo-800 tw-font-medium tw-text-[12px]">
    <span className="tw-font-[600] tw-font-montserrat tw-text-[15px] tw-leading-[100%] tw-tracking-[0%] tw-text-center tw-underline tw-decoration-solid tw-decoration-[0%] tw-decoration-[0.5px]">
  Browse File
</span>

    <input
      type="file"
      onChange={handleAssignmentFileUpload}
      className="tw-hidden"
      multiple
    />
  </label>
  <p className="tw-text-[12px] tw-text-gray-500 mt-1">
    Only <em>Doc, ppt and Pdfs</em> format is allowed
  </p>
</div>


      {/* Buttons */}
      <div className="tw-flex tw-justify-center tw-gap-3">
        <button
          onClick={() => setShowAssignmentUploadModal(false)}
          className="tw-border tw-border-indigo-800 tw-text-indigo-800 tw-text-[12px] tw-rounded tw-px-4 tw-py-[4px]"
        >
          Cancel
        </button>
        <button
 onClick={() => {
  setShowAssignmentUploadModal(false);
  setTimeout(() => {
    setShowAssignmentSuccess(true);
  }, 300);
}}

  className="tw-bg-indigo-800 tw-text-white tw-text-[12px] tw-rounded tw-px-4 tw-py-[4px]"
>
  Upload
</button>

      </div>
    </div>
  </div>
)}

{showAssignmentSuccess && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/40 tw-flex tw-items-center tw-justify-center">
    <div className="tw-bg-white tw-rounded-md tw-shadow-lg   tw-w-[326px] tw-h-[257px] tw-rounded-[4px] tw-p-[16px] tw-gap-[20px] tw-p-6 tw-text-center tw-relative">
      <button
        onClick={() => setShowAssignmentSuccess(false)}
        className="tw-absolute tw-top-2 tw-right-3 tw-text-gray-400 tw-text-lg"
      >
        ×
      </button>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
        <div className="tw-w-24 tw-h-24 tw-rounded-full tw-overflow-hidden">
          <img src={Tick} alt="Success" className="tw-w-full tw-h-full tw-object-contain" />
        </div>
        <h3 className="tw-font-semibold tw-text-lg">Completed</h3>
        <p className=" tw-text-sm tw-font-['Montserrat']">The Material has been added successfully.</p>
        <Button
          className="tw-bg-indigo-900 tw-text-white tw-px-6"
          onClick={() => setShowAssignmentSuccess(false)}
        >
          Continue
        </Button>
      </div>
    </div>
  </div>
)}
            <span className="tw-text-sm tw-text-gray-500">Accepted file types: Doc, ppt, and Pdfs</span>
          </div>

          <div className="tw-max-h-[200px] tw-overflow-y-auto tw-overflow-x-auto tw-rounded-md tw-border">

            <table className="tw-w-full tw-text-sm ">
              <thead className="tw-bg-gray-100 tw-text-left ">
                <tr>
                  <th className="tw-px-4 tw-py-2 tw-border">S.no</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Name</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Last Modified</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Size & Format</th>
                  <th className="tw-px-4 tw-py-2 tw-border">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignmentList.map((a, index) => (
                  <tr key={index} className="tw-bg-gray-100">
                    <td className="tw-px-4 tw-py-2 tw-border">{String(index + 1).padStart(2, '0')}</td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingAssignmentIndex === index ? (
                        <Input
                          value={editingAssignment.name}
                          onChange={(e) =>
                            setEditingAssignment({ ...editingAssignment, name: e.target.value })
                          }
                        />
                      ) : (
                        a.name
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingAssignmentIndex === index ? (
                        <Input
                          type="date"
                          value={editingAssignment.date}
                          onChange={(e) =>
                            setEditingAssignment({ ...editingAssignment, date: e.target.value })
                          }
                        />
                      ) : (
                        a.date
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      {editingAssignmentIndex === index ? (
                        <Input
                          value={editingAssignment.size}
                          onChange={(e) =>
                            setEditingAssignment({ ...editingAssignment, size: e.target.value })
                          }
                        />
                      ) : (
                        a.size
                      )}
                    </td>
                    <td className="tw-px-4 tw-py-2 tw-border">
                      <div className="tw-flex tw-gap-2">
                        {editingAssignmentIndex === index ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              const updated = [...assignmentList];
                              updated[index] = editingAssignment;
                              setAssignmentList(updated);
                              setEditingAssignmentIndex(null);
                            }}
                          >
                            Save
                          </Button>
                        ) : (
                          <>
                            <Pencil
                              size={16}
                              className="tw-cursor-pointer"
                              onClick={() => {
                                setEditingAssignmentIndex(index);
                                setEditingAssignment(a);
                              }}
                            />
                            <Trash2
                              size={16}
                              className="tw-cursor-pointer"
                              onClick={() => {
                                const updated = assignmentList.filter((_, i) => i !== index);
                                setAssignmentList(updated);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/*plus sign divider*/}

    <div className="tw-relative tw-my-1 tw-flex tw-items-center">
  <div className="tw-border-t tw-border-gray-300 tw-w-full tw-mb-5 tw-mt-7" />
  <div
    onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowCreateSectionModal(true);
    }}
    className="tw-absolute tw-left-1/2 -tw-translate-x-1/2 tw-bg-gray-200 tw-rounded-full tw-border tw-border-gray-300 tw-shadow-sm tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300"
  >
    <span className="tw-text-gray-500 tw-text-xl">+</span>
  </div>
</div>

{showCreateSectionModal && (
  <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/50 tw-flex tw-justify-center tw-items-center">
    <div
      className="tw-bg-white tw-rounded-[8px] tw-w-[360px] tw-h-[100px] tw-shadow-lg tw-p-[20px]  tw-flex-col tw-gap-[32px]"
      style={{ height: 'fit-content', top: '194px', left: '500px' }}
    >
      {/* Header */}
      <div className="tw-flex tw-justify-between tw-items-center">
       <h3
  className=" tw-text-[18px]  tw-font-['Montserrat'] tw-mb-4"
>
  Create Section
</h3>

        <button
          onClick={() => setShowCreateSectionModal(false)}
          className="tw-text-gray-500 tw-text-xl"
        >
          ×
        </button>
      </div>

      {/* Description */}
      <p className="  tw-mb-5">
        You can create section to upload a different set of documents
      </p>

      {/* Dropdown */}
      <select
  value={selectedSection}
  onChange={(e) => setSelectedSection(e.target.value)}
  className="tw-w-full tw-border tw-border-gray-300 tw-rounded tw-h-[36px] tw-px-4 tw-text-sm tw-mb-12"
>
  <option value="" disabled hidden>Select</option>
  <option value="Reading Materials">Reading Materials</option>
  <option value="Links">Links</option>
  <option value="Assignments">Assignments</option>
</select>
      {/* Buttons */}
      <div className="tw-flex tw-justify-between">
        <button
          onClick={() => setShowCreateSectionModal(false)}
          className="tw-border tw-border-indigo-800 tw-text-indigo-800 tw-px-5 tw-py-[6px] tw-rounded tw-text-sm tw-mt-12"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (selectedSection) {
              setShowCreateSectionModal(false);
              console.log('Selected:', selectedSection);
            }
          }}
          className="tw-bg-indigo-800 tw-text-white tw-px-5 tw-py-[6px] tw-rounded tw-text-sm tw-mt-12"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

        {/* Submit Button */}
        <div className="tw-text-left">
          <Button className="tw-bg-[#1A177A] tw-text-white tw-py-2 tw-px-6 tw-rounded tw-font-bold tw-w-full md:tw-w-[160px] tw-mt-2 sm:tw-mb-7">Done</Button>
        </div>
      </div>
    </div>
  
  );
};
export default AddMaterials;