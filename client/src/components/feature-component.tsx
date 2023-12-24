export const FeatureComponent = () => {
  return (
    <div
      id="feature"
      className="flex justify-center items-center mx-16 md:h-screen"
    >
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
        <div className="bg-base-300 p-6 rounded-lg flex flex-col gap-4">
          <div className="h-[40%]">
            <div className="bg-base-200 p-4 rounded-md w-fit text-2xl">🖥️</div>
          </div>
          <h4 className="font-bold text-lg h-[20%]">User Friendly Interface</h4>
          <p className="opacity-80 h-[40%]">
            "Intuitive interface for effortless navigation and user
            satisfaction."
          </p>
        </div>
        <div className="bg-base-300 p-6 rounded-lg flex flex-col gap-4">
          <div className="h-[40%]">
            <div className="bg-base-200 p-4 rounded-md w-fit text-2xl">🔒</div>
          </div>
          <h4 className="font-bold text-lg h-[20%]">Secure Data Managment</h4>
          <p className="opacity-80 h-[40%]">
            "Secure your data with encryption and token technology in our app."
          </p>
        </div>
        <div className="bg-base-300 p-6 rounded-lg flex flex-col gap-4">
          <div className="h-[40%]">
            <div className="bg-base-200 p-4 rounded-md w-fit text-2xl">🛠️</div>
          </div>
          <h4 className="font-bold text-lg h-[20%]">Rich Features</h4>
          <p className="opacity-80 h-[40%]">
            "Maximize productivity: customize themes, monitor tasks, and
            organize todos in one app."
          </p>
        </div>
        <div className="bg-base-300 p-6 rounded-lg flex flex-col gap-4">
          <div className="h-[40%]">
            <div className="bg-base-200 p-4 rounded-md w-fit text-2xl">🌐</div>
          </div>
          <h4 className="font-bold text-lg h-[20%]">Open Source</h4>
          <p className="opacity-80 h-[40%]">
            "Unleash potential where brilliance meets open source. Embrace code
            freedom, and witness innovation flourish."
          </p>
        </div>
        <div className="bg-base-300 p-6 rounded-lg flex flex-col gap-4">
          <div className="h-[40%]">
            <div className="bg-base-200 p-4 rounded-md w-fit text-2xl">🔥</div>
          </div>
          <h4 className="font-bold text-lg h-[20%]">
            Develop with Popular Framework
          </h4>
          <p className="opacity-80 h-[40%]">
            "Revolutionizing with new-gen frameworks for a seamless blend of
            innovation and efficiency in your digital experience."
          </p>
        </div>
        <div className="bg-base-300 p-6 rounded-lg flex flex-col gap-4">
          <div className="h-[40%]">
            <div className="bg-base-200 p-4 rounded-md w-fit text-2xl">🤝</div>
          </div>
          <h4 className="font-bold text-lg h-[20%]">Social Connectivity</h4>
          <p className="opacity-80 h-[40%]">
            "Foster a sense of community within our platform's ecosystem."
          </p>
        </div>
      </div>
    </div>
  );
};
