


const UserFooter =()=>{

  return (
    <>
  {/* TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com */}
  {/*Footer container*/}
  <footer
    className="flex flex-col items-center text-center text-white  "
    style={{ backgroundColor: "#0a4275" }}
  >
    <div className="container p-6">
      <div className="">
        <p className="flex items-center justify-center">
          <span className="mr-4">Vcare Hospital</span>
          <button
            type="button"
            className="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init=""
            data-te-ripple-color="light"
          >
            We care your family
          </button>
        </p>
      </div>
    </div>
    {/*Copyright section*/}
    <div
      className="w-full p-4 text-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      © 2023 Contact Us:
      <p className="text-white">
        vcarehelp@gmail.com
      </p>
    </div>
  </footer>
</>

  )
}


export default UserFooter