import darkImage from "../assets/dark.png";
import lightImage from "../assets/light.png";
import darkThemeImage from "../assets/dark-theme.png";
import lightThemeImage from "../assets/light-theme.png";
import AdminSettingsLight from "../assets/admin-setting-light.png";
import AdminSettingsDark from "../assets/admin-settings-dark.png";
import profileImage from "../assets/profile.png";
import lightDashboard from "../assets/light-dashboard.png";
import darkDashboard from "../assets/dark-dashboard.png";
import useTheme from "../hooks/use-theme";

export const ShowcaseComponent = () => {
  const { theme } = useTheme();

  return (
    <div
      id="showcase"
      className="flex flex-col justify-center items-center mx-16 h-screen"
    >
      <div className="carousel w-full rounded-box bg-base-300 py-2">
        <div id="item1" className="carousel-item w-full">
          <div className="w-full text-center flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-bold">Dark and Light Theme</h2>
            <div className="diff aspect-[16/9] w-[65%]">
              <div className="diff-item-1">
                <img alt="dark" className="object-contain" src={darkImage} />
              </div>
              <div className="diff-item-2">
                <img alt="light" className="object-contain" src={lightImage} />
              </div>
              <div className="diff-resizer"></div>
            </div>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full">
          <div className="w-full text-center flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-bold">13+ Theme Preset</h2>

            <img
              alt="dark-theme"
              className="object-contain"
              src={theme === "light" ? lightThemeImage : darkThemeImage}
            />
          </div>
        </div>
        <div id="item3" className="carousel-item w-full">
          <div className="w-full text-center flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-bold">Personalized your Profile</h2>
            <img
              src={profileImage}
              alt="profile"
              className="object-contain w-64"
            />
          </div>
        </div>
        <div id="item4" className="carousel-item w-full">
          <div className="w-full text-center flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-bold">Monitoring your Activity</h2>
            <div className="diff aspect-[16/9] w-[60%]">
              <div className="diff-item-1">
                <img
                  alt="dark-theme"
                  className="object-contain"
                  src={darkDashboard}
                />
              </div>
              <div className="diff-item-2">
                <img
                  alt="light-theme"
                  className="object-contain"
                  src={lightDashboard}
                />
              </div>
              <div className="diff-resizer"></div>
            </div>
          </div>
        </div>
        <div id="item5" className="carousel-item w-full">
          <div className="w-full text-center flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-bold">Admin Settings</h2>
            <div className="diff aspect-[16/9] w-[65%]">
              <div className="diff-item-1">
                <img
                  alt="dark"
                  className="object-contain"
                  src={AdminSettingsDark}
                />
              </div>
              <div className="diff-item-2">
                <img
                  alt="light"
                  className="object-contain"
                  src={AdminSettingsLight}
                />
              </div>
              <div className="diff-resizer"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
        <a href="#item5" className="btn btn-xs">
          5
        </a>
      </div>
    </div>
  );
};
