export const NoResultsPage = ({
  emoji,
  resultsName,
}: {
  emoji: string;
  resultsName: string;
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center text-center gap-2 h-96 relative top-[20vh]">
        <h1 className="text-4xl">{emoji}</h1>
        <h2 className="text-2xl">
          Oops! It seems there are no {resultsName} found.
        </h2>
      </div>
    </div>
  );
};
