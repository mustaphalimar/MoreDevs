import { IoIosShareAlt } from "react-icons/io";
import profile from "../../assets/profile.jpg";
import { GoPrimitiveDot } from "react-icons/go";
import Button from "../../components/ui/Button";
import MyTabs from "../../components/ui/Tabs";
import About from "../../components/ui/profile/About";
import Skills from "../../components/ui/profile/Skills";
import Projects from "../../components/ui/profile/Project/Projects";
import Experience from "../../components/ui/profile/Experiences/Experience";
import Education from "../../components/ui/profile/Education/Education";
import Post from "../../components/ui/post";
import ProfileSettings from "../../components/ui/profile/Profile Setting/ProfileSettings";

const bgImage = null;

const Profile = () => {
  return (
    <div className="w-full space-y-6 max-w-[1100px] mb-20">
      <div className="rounded  w-full  border border-gray-100">
        <div className="w-full h-[200px]">
          {bgImage ? (
            <img src={bgImage} alt="bg image" />
          ) : (
            <div className="w-full rounded-t  h-full bg-gradient-to-tr from-yellow-200 to-pink-200">
              {" "}
            </div>
          )}
        </div>

        <div className="flex justify-between items-start">
          <div className="-mt-[90px] p-5 ">
            <div className="bg-white  inline-block rounded-full">
              <img
                src={profile}
                alt="profile image"
                className="w-[160px] h-[160px] rounded-full m-1"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <h1 className="font-semibold text-2xl text-black-900">
                Jon Snow
              </h1>
              <p className="text-black-600">🚩 Agadir, Morocco</p>
              <div className="block space-x-1 items-center sm:flex">
                <h4>@Jsnow21</h4>
                <GoPrimitiveDot className="hidden sm:block text-black-600" />
                <h4 className="font-medium">
                  Lead product designer at MoreDevs.
                </h4>
                <GoPrimitiveDot className="text-black-600 hidden sm:block" />
                <h4 className="text-black-600">Full-time</h4>
              </div>
            </div>

            <div className="flex space-x-2 items-center mt-4">
              <Button type="button">Message</Button>
              <Button type="button" outline>
                <span className="flex space-x-1 items-center">
                  <IoIosShareAlt size={12} /> <span>Share profile</span>
                </span>
              </Button>
            </div>
          </div>

          <div className="mt-6 mr-4">
            <Button type="button">
              <span className="flex space-x-1 items-center text-white ">
                <span>Follow +</span>
              </span>
            </Button>
          </div>
        </div>
      </div>

      <MyTabs
        tabsArr={["Profile", "Posts", "Settings"]}
        c1={
          <div className={"space-y-6"}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
          </div>
        }
        c2={
          <div className="max-w-[600px]">
            <Post />
            <Post />
            <Post />
          </div>
        }
        c3={<ProfileSettings />}
      />
    </div>
  );
};
// export default withAuth(Profile);

export default Profile;
