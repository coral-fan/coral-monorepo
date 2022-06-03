import { useSignInModalState } from 'components/app';

export const Home = () => {
  const { openModal } = useSignInModalState();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Sample HTML Using Tailwind</h1>
      {/* Example Link */}
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        href="#"
      >
        Link
      </a>
      <br />
      {/* Example Button */}
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Sign Up
      </button>
    </div>
  );
};
