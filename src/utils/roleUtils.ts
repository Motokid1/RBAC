// Get the appropriate text color class based on user role
export const getRoleColor = (role: string): string => {
  switch (role) {
    case "super_admin":
      return "text-purple-600"; // Purple for super admin
    case "admin":
      return "text-blue-600"; // Blue for admin
    case "user":
      return "text-green-600"; // Green for regular user
    default:
      return "text-gray-600"; // Gray for unknown roles
  }
};

// Get the list of permissions for each role
// Used to determine what actions a user can perform
export const getRolePermissions = (role: string): string[] => {
  switch (role) {
    case "super_admin":
      return ["View Users", "Delete Users", "Manage Admins"]; // Full access
    case "admin":
      return ["View Users"]; // Can only view users
    case "user":
      return []; // No special permissions
    default:
      return [];
  }
};
