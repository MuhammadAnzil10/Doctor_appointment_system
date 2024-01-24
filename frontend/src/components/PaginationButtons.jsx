


const PaginationButtons = ({currentPage, setCurrentPage, indexOfLastItem, filteredDoctors })=>{
  return(
    <div className="flex justify-center mt-4">
        <button
          onClick={(e) => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "text-gray-500" : "text-gray-800"
          } bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-l`}
        >
          Prev
        </button>

        <button
          onClick={(e) => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= filteredDoctors.length}
          className={`${
            indexOfLastItem >= filteredDoctors.length
              ? "text-gray-500"
              : "text-gray-800"
          } bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-r`}
        >
          Next
        </button>
      </div>
  )
}

export default PaginationButtons;