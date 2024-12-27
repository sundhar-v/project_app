import Header from "../../component/Header/Header"

const AppHeader = ({ currentPage, setCurrentPage }) =>{
    return <Header 
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    />
}

export default AppHeader