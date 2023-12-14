




const Tables = ({ users, blockHandler, unBlockHandler }) => {

  

  return (
    <div className="flex flex-col p-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Blood Group
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => {
       
                  return (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={index}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index+1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.age}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.bloodGroup}
                      </td>
                     <td>{user?.isBlocked ? (<button className="bg-red-500 text-white p-2 rounded-md border
                      border-red-700 hover:bg-red-700 focus:outline-none focus:ring focus:border-fred-300"
                      onClick={e=>unBlockHandler(user._id)}
                      >
                        Click me
                      </button>) : (<button className="bg-blue-500 text-white p-2 rounded-md border
                      border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                      onClick={e=>blockHandler(user._id)}
                      >
                        Click me
                      </button>) 
                }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
