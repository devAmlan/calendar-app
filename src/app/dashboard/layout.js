import Sidebar from "../_components/sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="w-full flex justify-start items-start">
      <div className="w-60 h-[calc(100vh-60px)] border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
}
