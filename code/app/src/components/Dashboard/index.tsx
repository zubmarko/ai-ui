// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Tooltip from '../Tooltip';
import { fetchFrameworks } from '../../api/fakeRequest';
import { v4 as uuidv4 } from 'uuid';

// Yup schema definition
const schema = Yup.object().shape({
  frameworks: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().min(2, 'Name must be at least 2 characters long').required('Name is required'),
      type: Yup.string(),
      githubStars: Yup.number(),
      pros: Yup.string(),
      cons: Yup.string(),
    })
  )
});

const Dashboard = () => {
  const { register, control, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      frameworks: []
    }
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'frameworks'
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchFrameworks();
        reset({ frameworks: data });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch frameworks", error);
        setLoading(false);
      }
    };
    loadData();
  }, [reset]);

  const onSubmit = data => {
    // fields.push()
    reset({
      frameworks: data.frameworks
    });
    // replace(data.frameworks);
    setEditMode(false); // Optionally exit edit mode on save
  };

  const toggleEditMode = () => {
    if (editMode && isDirty) {
      setShowModal(true);
    } else {
      setEditMode(!editMode);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirmExit = () => {
    reset(); // Reset to initial data if exiting edit mode
    setEditMode(false);
    setShowModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());

    // const filteredFrameworks = fields?.filter(framework =>
    //   framework.name.toLowerCase().includes(searchTerm)
    // );

  

    // replace(filteredFrameworks);

  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="loader">
        Loading...
      </div>
    </div>;
  }


  const filteredFrameworks = fields?.filter(framework =>
    framework.name.toLowerCase().includes(searchTerm)
  );


  return (
    <>
      {showModal && (
        <div data-testid="frameworks-table" className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h4 className="text-lg font-bold">Confirm Exit</h4>
            <p className="my-2">Are you sure you want to exit edit mode? Unsaved changes will be lost.</p>
            <div className="flex justify-end space-x-2">
              <button onClick={handleConfirmExit} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Confirm</button>
              <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <h1 className="text-3xl font-bold mb-5">Dashboard - Top JavaScript Frameworks</h1>
        <div className="flex justify-between items-center mb-4">

          <div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded"
            />
            <button type="button" className="p-2 bg-gray-300 text-black rounded">
              🔍
            </button>
          </div>

          <div>
            <button data-testid="toggle-edit" type="button" onClick={toggleEditMode} className="mr-4 p-2 bg-blue-400 text-white rounded">
              {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
            {editMode && (
              <>
                <button data-testid="add-framework-button" type="button" onClick={() => append({ id: uuidv4(), name: '', type: 'Library', githubStars: 0, pros: '', cons: '' })}
                  className="mr-4 p-2 bg-green-500 text-white rounded">
                  Add Framework
                </button>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded ">Save Changes</button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredFrameworks.map((field, index) => {
            // const fieldIndex = index;
            // Next code was fixed by human
            // UI should use correct index from fields
            const fieldIndex = fields.findIndex(formField => formField.id === field.id);
            return (
              <div key={field.id} className="p-4 shadow rounded-lg bg-white">
                {editMode ? (
                  <>
                    <input key={field.id} {...register(`frameworks.${fieldIndex}.name`)} defaultValue={field.name} className="text-xl font-semibold outline-none" />
                    {errors.frameworks && errors.frameworks[fieldIndex] && (
                      <p className="text-red-500">{errors.frameworks[fieldIndex].name?.message}</p>
                    )}
  
                    <Tooltip text="Remove">
                      <button data-testid={`delete-framework-${index + 1}`} type="button" onClick={() => remove(fieldIndex)} className="ml-2 text-red-500"
                      >
                        🗑️
                      </button>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{field.name}</h2>
                    <div>
                      ({field.type})
                    </div>
                  </>
                )}
                <p><span className='font-bold'>GitHub Stars</span>: {field.githubStars}</p>
                <p><span className='font-bold'>Pros</span>: {field.pros}</p>
                <p><span className='font-bold'>Cons</span>: {field.cons}</p>
              </div>
            )
          })}
        </div>
      </form>
    </>
  );
};

export default Dashboard;
