const DSMetrics = ({
  sourceCharsUsed,
  totalSourceChars,
}: {
  sourceCharsUsed: number;
  totalSourceChars: number;
}) => {
  const usePercent = Math.round((sourceCharsUsed / totalSourceChars) * 100);
  const colorMode = usePercent >= 70 ? "unsafe" : "safe";

  return (
    <div className="p-4 rounded-md bg-white ring-1 ring-black ring-opacity-5 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <h2>Source Characters Used</h2>
      </div>
      <div className="flex gap-5 items-center">
        <div className="rounded-full h-[10px] w-full bg-gray-200">
          <div
            className={
              `rounded-full h-[10px] transition-[width] ` +
              (colorMode === "safe" ? "bg-green-400" : "bg-red-400")
            }
            style={{ width: usePercent + "%" }}
          />
        </div>
        <span
          className={
            "px-3 py-2 rounded-full ring-opacity-2 whitespace-nowrap " +
            (colorMode === "safe"
              ? "bg-green-100 text-green-800 ring-1 ring-green-400"
              : "bg-red-100 text-red-800 ring-1 ring-red-400")
          }
        >
          {`${sourceCharsUsed} / ${totalSourceChars}`}
        </span>
      </div>
      <div className="flex w-full"></div>
    </div>
  );
};

export default DSMetrics;
