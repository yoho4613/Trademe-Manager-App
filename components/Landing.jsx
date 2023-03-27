import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VimeoPlayer from "react-player/vimeo";

const Landing = () => {
  const [video, setVideo] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (typeof window !== undefined) {
      setVideo(true);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if the current window width is less than or equal to 750px
    if (windowSize.width <= 990) {
      // Do something here, like update a state variable
      // For example: setIsMobile(true);
    } else {
      // Do something else here, like update a state variable
      // For example: setIsMobile(false);
    }
  }, [windowSize]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    
  }

  return (
    <div>
      <section
        className="relative mb-20 overflow-hidden"
        style={{
          height: `${
            windowSize.width < 775
              ? windowSize.width < 450
                ? "70vh"
                : "80vh"
              : "65vh"
          }`,
        }}
      >
        <div
          className="relative w-screen overflow-hidden bg-no-repeat bg-cover"
          style={{
            backgroundPosition: "50%",
            backgroundImage:
              "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
            height: "100%",
          }}
        ></div>
        {video && (
          <ReactPlayer
            url={`https://vimeo.com/${
              windowSize.width < 775 ? "735927919" : "735927979"
            }`}
            playing={true}
            loop
            muted
            allowFullScreen
            className="absolute top-0 left-0 w-screen"
            width="100%"
            height={"120vh"}
            style={{
              position: "absolute",
              top: "-25vh",
              left: 0,
              backgroundSize: "cover",
              transform:
                windowSize.width < 1080
                  ? windowSize.width < 775
                    ? "scale(1.2)"
                    : "scale(1.4)"
                  : "",
            }}
            config={{ VimeoPlayer }}
          />
        )}
        {/* 735927919 for portlait */}
        <div>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-white px-6 md:px-12">
                <h1 className=" text-2xl sm:text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                  The best tool for TradeMe NZ <br />
                  <span>for your convenience</span>
                </h1>
                <a
                  type="button"
                  href="/login"
                  className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-32 text-gray-800 text-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-0 items-center">
          <div className="mb-12 lg:mb-0 relative">
            <svg
              className="w-12 h-12 text-blue-600 mx-auto mb-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
              ></path>
            </svg>
            <h5 className="text-lg font-medium text-blue-600 font-bold mb-4">
              API
            </h5>
            <h6 className="font-medium text-gray-500">Components</h6>
            <hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
          </div>

          <div className="mb-12 lg:mb-0 relative">
            <svg
              className="w-12 h-12 text-blue-600 mx-auto mb-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"
              />
            </svg>
            <h5 className="text-lg font-medium text-blue-600 font-bold mb-4">
              Real Time
            </h5>
            <h6 className="font-medium text-gray-500">Design blocks</h6>
            <hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
          </div>

          <div className="mb-12 md:mb-0 relative">
            <svg
              className="w-12 h-12 text-blue-600 mx-auto mb-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
              />
            </svg>
            <h5 className="text-lg font-medium text-blue-600 font-bold mb-4">
              Images
            </h5>
            <h6 className="font-medium text-gray-500">Templates</h6>
            <hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
          </div>

          <div className="relative">
            <svg
              className="w-12 h-12 text-blue-600 mx-auto mb-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M320,32a32,32,0,0,0-64,0v96h64Zm48,128H16A16,16,0,0,0,0,176v32a16,16,0,0,0,16,16H32v32A160.07,160.07,0,0,0,160,412.8V512h64V412.8A160.07,160.07,0,0,0,352,256V224h16a16,16,0,0,0,16-16V176A16,16,0,0,0,368,160ZM128,32a32,32,0,0,0-64,0v96h64Z"
              />
            </svg>
            <h5 className="text-lg font-medium text-blue-600 font-bold mb-4">
              Save Money
            </h5>
            <h6 className="font-medium text-gray-500 mb-0">Plugins</h6>
          </div>
        </div>
      </section>

      <section className="mb-32 text-gray-800">
        <div className="block rounded-lg shadow-lg bg-white">
          <div className="flex flex-wrap items-center">
            <div className="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/012.jpg"
                alt="Trendy Pants and Shoes"
                className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
              />
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
              <div className="px-6 py-12 md:px-12">
                <h2 className="text-3xl font-bold mb-6">Why is it so great?</h2>
                <p className="text-gray-500 mb-6">
                  Nunc tincidunt vulputate elit. Mauris varius purus malesuada
                  neque iaculis malesuada. Aenean gravida magna orci, non
                  efficitur est porta id. Donec magna diam.
                </p>

                <div className="grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Support 24/7
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Analytics
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Components
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Updates
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Reports
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Mobile
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Modules
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Blocks
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Templates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container my-24 px-6 mx-auto">
          <section
            className="mb-32 text-gray-800 background-radial-gradient"
            style={{
              backgroundColor: "hsl(218, 41%, 15%)",
              backgroundImage:
                "radial-gradient(650px circle at 0% 0%, hsl(218, 41%, 35%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%), radialGradient( 1250px circle at 100% 100%, hsl(218, 41%, 45%) 15%, hsl(218, 41%, 30%) 35%, hsl(218, 41%, 20%) 75%, hsl(218, 41%, 19%) 80%, transparent 100%)",
            }}
          >
            {/* <style>
      .background-radial-gradient {
       
      }
    </style> */}

            <div className="px-6 py-12 md:px-12 text-center lg:text-left">
              <div className="container mx-auto xl:px-32">
                <div className="grid lg:grid-cols-2 gap-12 flex items-center">
                  <div className="mt-12 lg:mt-0">
                    <h1
                      className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
                      style={{ color: "hsl(218, 81%, 95%)" }}
                    >
                      Do not miss <br />
                      <span style={{ color: "hsl(218, 81%, 75%)" }}>
                        any updates
                      </span>
                    </h1>
                    <p
                      className="mb-4 opacity-70 lead"
                      style={{ color: "hsl(218, 81%, 85%)" }}
                    >
                      We will write rarely and only high-quality content.
                    </p>
                  </div>
                  <div className="mb-12 lg:mb-0">
                    <div className="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
                      <h2 className="text-3xl font-bold mb-12">
                        Subscribe to the newsletter
                      </h2>
                      <form>
                        <div className="form-group mb-6">
                          <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInput90"
                            placeholder="Name"
                          />
                        </div>
                        <div className="form-group mb-6">
                          <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInput91"
                            placeholder="Email address"
                          />
                        </div>
                        <div className="form-group form-check text-center mb-6">
                          <input
                            type="checkbox"
                            className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            id="exampleCheck96"
                            name="exampleCheck96"
                            defaultChecked
                          />
                          <label
                            className="form-check-label inline-block text-gray-800"
                            htmlFor="exampleCheck96"
                          >
                            I have read and agree to the terms
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={(e) => handleSubscribe(e)}
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Landing;
