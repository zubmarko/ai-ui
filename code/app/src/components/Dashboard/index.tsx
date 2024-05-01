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
      type: Yup.string().min(2, 'Type must be at least 2 characters long').required('Pros is required'),
      githubStars: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required('GitHub Stars are required'),
      pros: Yup.string().min(2, 'Pros must be at least 2 characters long').required('Pros is required'),
      cons: Yup.string().min(2, 'Cons must be at least 2 characters long').required('Cons is required'),
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
    // Next code was fixed by human
    reset({
      frameworks: data.frameworks
    });
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
            <button data-testid="toggle-edit" type="button" onClick={toggleEditMode} className="text-sm mr-4 p-2 bg-blue-400 text-white rounded">
              {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
            {editMode && (
              <>
                <button data-testid="add-framework-button" type="button" onClick={() => append({ id: uuidv4(), name: '', type: 'Library', githubStars: 0, pros: '', cons: '', logoUrl: 'https://via.placeholder.com/100x80.png/ffffff?text=NewFramework' })}
                  className="text-sm mr-4 p-2 bg-green-500 text-white rounded">
                  Add Framework
                </button>
                <button type="submit" className="text-sm p-2 bg-blue-500 text-white rounded ">Save Changes</button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredFrameworks.map((field, index) => {
            // const fieldIndex = index;
            // Next code was fixed by human
            // UI should use correct index from fields
            const fieldIndex = fields.findIndex(formField => formField.id === field.id);
            return (
              <div key={field.id} className="p-4 shadow rounded-lg bg-white">
                <div className='relative'>
                  <div className="flex justify-center items-center h-20 mb-2"> {/* Adjust height as needed */}
                    {field.logoUrl ? <img src={field.logoUrl} alt={`${field.name} logo`} className="max-w-[120px] max-h-[70px]" /> : null}
                  </div>
                  {editMode ? (
                    <>
                      <input
                        data-testid={`frameworks.${fieldIndex}.name`}
                        {...register(`frameworks.${fieldIndex}.name`)} defaultValue={field.name} className="text-xl font-semibold  w-full " />
                      {errors.frameworks && errors.frameworks[fieldIndex] && (
                        <p className="text-red-500 text-sm">{errors.frameworks[fieldIndex].name?.message}</p>
                      )}
                      <div>
                        <input
                          data-testid={`frameworks.${fieldIndex}.type`}
                          {...register(`frameworks.${fieldIndex}.type`)} defaultValue={field.type} className=" w-full " />
                        {errors.frameworks && errors.frameworks[fieldIndex] && (
                          <p className="text-red-500 text-sm">{errors.frameworks[fieldIndex].type?.message}</p>
                        )}

                      </div>
                      <div className="absolute top-2 right-2">
                        <Tooltip text="Remove">
                          <button data-testid={`delete-framework-${index + 1}`} type="button" onClick={() => remove(fieldIndex)} className="ml-2 text-red-500"
                          >
                            🗑️
                          </button>
                        </Tooltip>
                      </div>

                      <div className="text-sm text-gray-600 mb-2">GitHub Stars: <div className="font-medium">
                        <input
                          data-testid={`frameworks.${fieldIndex}.githubStars`}
                          type="number" {...register(`frameworks.${fieldIndex}.githubStars`)} defaultValue={field.githubStars} className=" w-full " />
                        {errors.frameworks && errors.frameworks[fieldIndex] && (
                          <p className="text-red-500 text-sm">{errors.frameworks[fieldIndex].githubStars?.message}</p>
                        )}

                      </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Pros: <div className="font-medium">
                        <textarea {...register(`frameworks.${fieldIndex}.pros`)} defaultValue={field.pros} className="resize-none w-full " />
                        {errors.frameworks && errors.frameworks[fieldIndex] && (
                          <p className="text-red-500 text-sm">{errors.frameworks[fieldIndex].pros?.message}</p>
                        )}
                      </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Cons: <div className="font-medium">
                        <textarea {...register(`frameworks.${fieldIndex}.cons`)} defaultValue={field.cons} className="resize-none w-full " />
                        {errors.frameworks && errors.frameworks[fieldIndex] && (
                          <p className="text-red-500 text-sm">{errors.frameworks[fieldIndex].cons?.message}</p>
                        )}
                      </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">{field.name}</h2>
                      <div>
                        ({field.type})
                      </div>
                      <div className="text-sm text-gray-600 mb-2">GitHub Stars: <div className="font-medium">{field.githubStars}</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Pros: <div className="font-medium">{field.pros}</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Cons: <div className="font-medium">{field.cons}</div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            )
          })}
        </div>
      </form>
    </>
  );
};

export default Dashboard;
