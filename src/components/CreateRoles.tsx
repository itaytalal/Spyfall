import React from "react";

type Props = {
  newRole: string;
  setNewRole: (role: string) => void;
  roles: string[];
  setRoles: (r: string[]) => void;
  savePlace:()=>void
};

const CreateRoles = ({ roles, setRoles, newRole, setNewRole ,savePlace}: Props) => {
  const addRole = (role: string) => {
    if (!role.trim()) return;
    if (roles.includes(role)) return;
    setRoles([...roles, role]);
    setNewRole("");
  };
  const removeRole = (role: string) => {
    if (roles.length === 1) return setRoles([]);
    const filtered = roles.filter((j) => j != role);
    setRoles(filtered);
  };
  return (
    <table className="mt-2">
      <tbody>
        {roles?.map((role, index) => (
          <tr key={7000 + index} className="border-b border-gray-700">
            <td className="p-2 flex justify-between items-center text-gray-700">
              <span>{role}</span>
              <button
                onClick={() => removeRole(role)}
                className="px-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                X
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td className="flex flex-row gap-1 p-2">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="הכנס תפקיד"
            />
            <button
              onClick={() => addRole(newRole)}
              className="rounded shadow px-2 text-lg text-white bg-gray-700"
            >
              +
            </button>
          </td>
        </tr>
        <tr>
          <td className="flex m-3 justify-center">
            <button
            onClick={savePlace} 
            className="bg-green-500 rounded shadow px-4 py-2 text-white">
              סיים
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CreateRoles;
