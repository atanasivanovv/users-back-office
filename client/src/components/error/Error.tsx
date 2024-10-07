export const Error = ({ message }: { message: string | null }) => {
  if (!message) {
    return null;
  }

  return (
    <p className="text-red-500">
      <i className="fa-solid fa-circle-exclamation pt-2" /> {message}
    </p>
  );
};
