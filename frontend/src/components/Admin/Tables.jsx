import { useState, useEffect } from "react";
import { filterData, sort } from "../../Helpers";

const Tables = ({ users, blockHandler, unBlockHandler }) => {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("Asc");
  const [filterUsers, setFilteredUsers] = useState(users || []);

  useEffect(() => {
    if (users) {
      const filteredUsers = filterData(users, searchText);
      const sortedUsers = sort(filteredUsers, sortOrder);
      setFilteredUsers(sortedUsers);
    }
  }, [searchText, users, sortOrder]);

  return (
    <div className="flex flex-col p-3 min-h-screen  border-gray-600 border-4 m-2  ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-2">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="mb-2">
            <input
              type="text"
              name="search"
              id=""
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search User"
              className="text-center border-gray-500 h-9 focus:border-blue-500 focus:outline-none focus:ring rounded-md"
            />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              name="sort"
              id="sort"
              className="ml-2 w-44 h-9 rounded-md border-gray-500 focus:outline-none focus:ring focus:border-blue-500 "
            >
              <option value="Asc">Sort A-Z</option>
              <option value="Desc">Sort Z-A</option>
            </select>
          </div>
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
                {filterUsers?.map((user, index) => {
                  return (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={index}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
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
                      <td>
                        {user?.isBlocked ? (
                          <button
                            className="bg-green-500 text-white p-2 rounded-md border
                      border-red-700 hover:bg-green-700 focus:outline-none focus:ring focus:border-fred-300"
                            onClick={(e) => unBlockHandler(user._id)}
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            className="bg-red-500 text-white p-2 rounded-md border
                      border-red-700 hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
                            onClick={(e) => blockHandler(user._id)}
                          >
                            Block
                          </button>
                        )}
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
