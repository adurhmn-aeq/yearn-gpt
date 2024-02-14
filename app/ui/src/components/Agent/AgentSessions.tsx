type Props = {
  sessions: any[];
};

export default function AgentSessions({ sessions }: Props) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold ml-3">Sessions</h1>
        <div className="bg-white py-8 px-4 w-[500px] border sm:rounded-lg sm:px-10 dark:bg-black dark:border-gray-800">
          {sessions.map(({ name, email }) => (
            <div className="p-3 rounded-md shadow-md ring-1 hover:shadow-xl hover:ring-2 flex justify-between hover:cursor-pointer">
              <p className="text-gray-700 ">{name}</p>
              <p className="text-gray-700 ">{email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
