import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store';
import Spinner from './Spinner';

export default function DetailCard() {

  const navigate = useNavigate()
  const user = useUserStore((state) => state.user);

  return (
    <div className=' max-w-md mx-auto '>

      {!user ? (
        <div className=' h-96 flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className=' bg-white shadow-xl rounded-2xl p-8 mt-8'>
          <div className='flex items-center space-x-4 mb-6'>
            <img
              src={user?.picture.large}
              alt={`${user?.name.first} ${user?.name.last}`}
              className='w-24 h-24 rounded-full object-cover border-4 border-blue-500'
            />
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>
                {user?.name.first} {user?.name.last}
              </h2>
              <p className='text-gray-500'>Edad: {user?.dob.age} años</p>
            </div>
          </div>

          <div className='space-y-2 text-gray-700 text-base'>
            <p>
              <span className='font-bold'>Celular:</span> {user?.cell}
            </p>
            <p>
              <span className='font-bold'>Email:</span> {user?.email}
            </p>
            <p>
              <span className='font-bold'>País:</span> {user?.location.country}
            </p>
            <p>
              <span className='font-bold'>Ciudad:</span> {user?.location.city}
            </p>
            <p>
              <span className='font-bold'>Calle:</span> {user?.location.street.name}{' '}
              - # {user?.location.street.number}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-5 cursor-pointer text-center transition duration-200'
          >
            Volver
          </button>
        </div>
      )}
    </div>
  )
}
