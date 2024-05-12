import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../store/store';
function Products() {
    const { searchQuery } = useAppContext();  //for the search query
    const [data, setData] = useState([]);  //for the data we will fetch from the api
    const [loading, setLoading] = useState(false);  //for the loading logic
    const [currentPage, setCurrentPage] = useState(1);  //pagination logic setting the initial value of current page
    const [itemsPerPage] = useState(5);  //pagination logic, specifies the no. of products per page
    const [filter, setFilter] = useState(data);  //filtering logic according to search query or the categories
    
    //fetching the data from api
    useEffect(() => {
        let componentMounted = true;
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (componentMounted) {
                const data = await response.json();
                setData(data);
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);  //used the UseEffect hook for the first time the page is loaded 

    //useEffect Hook for searching 
    useEffect(() => {
        const filteredProducts = data.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilter(filteredProducts);
    }, [searchQuery, data]);

    const totalPages = Math.ceil(filter.length / itemsPerPage);   //logic for calculating totalpages
    const indexOfLastItem = currentPage * itemsPerPage;  
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);  //slicing the elements according to the current page

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const Loading = () => {
        return (
            <>
                {/*Categories Frontend while loading*/ }
                <div className="col-md-3 my-3">
                    <div className="position-sticky" style={{ top: "100px" }}>
                        <h3>Categories</h3>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => setFilter(data)}>All</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("electronics")}>Electronics</button>
                    </div>

                </div>
                {/*Loading logic*/}
                <div className="col-md-9 py-md-3">
                    <div className="row">
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 mb-3">
                            <Skeleton height={400} width={"100%"}/>
                        </div>  
                    </div>

                </div>


            </>
        )
    }
    //filtering according to category
    const filterProduct = (category) => {
        const updateList = data.filter((x) => x.category === category);
        setFilter(updateList);
    }
    //Frontend for showing products
    const ShowProducts = () => {
        return (
            <>
                <div className="col-md-3 my-3">

                    <div className="position-sticky" style={{ top: "100px" }}>
                        <h2>Categories</h2>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => setFilter(data)}>All</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                        <button className="btn btn-outline-info m-1 btn-sm" onClick={() => filterProduct("electronics")}>Electronics</button>
                    </div>

                </div>

                <div className="col-md-9 py-md-3">
                    <div className="row">
                        {/*Using maps to display and the card method*/}
                        {currentItems.map((product) => {
                            return (
                                <div className="col-6 col-md-6 col-lg-4 mb-3" key={product.id}>

                                    <div className="card h-100">
                                        <img src={product.image} className="m-3" style={{ height: "300px", width: "auto", objectFit: "contain" }} alt={product.title} />
                                        <div className="m-3 mb-0">
                                            <strong className="card-title">{product.title.substring(0, 50)}...</strong>
                                        </div>
                                        <div style={{ marginTop: "auto" }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="m-3"><b>${product.price}</b></div>
                                                <NavLink className="stretched-link" to={`/product/${product.id}`}>
                                                    <button className="btn btn-outline-success m-3">
                                                        Go To Product
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>


            </>
        )
    }
    
    return (
        <div className="container">
            <div className="row">
                {/*Logic for loading and shwoing products*/}
                {loading ? <Loading /> : <ShowProducts />}
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Products