import React, {useEffect, useState} from "react";
import {Category} from "../Category";
import {GetCategories, GetProducts, GetProductsByCategories} from './service';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import ProductsView from '../../shared/Products/product';
import "./shop.css";

const pageName = "Shop";
var uniqueCategories = [];
var uniqueSellers = [];

function Shop(props) {

    const [data, setData] = useState({original: [], filtered: [], categories: []});
    const [plantCheckBoxes, setPlantBoxes] = useState([]);
    const [sellerCheckBoxes, setsellerBoxes] = useState([]);
    const [filterCat, setFilterCat] = useState([]);

    const [state, setState] = useState({
        data: [],
        page: 1,
        totalPages: 1,
        loading: false,
        categories: [],
        selectedCategories: [],
        products: []
    });

    const handleChangeSelectedCategories = async (categories) => {
        const {data} = await GetProductsByCategories(categories);
        setState({...state, selectedCategories: categories, products: data});
    }

    useEffect(() => {
        async function fetchData() {
            const categories = await GetCategories();
            const products = await GetProducts();
            setState({...state, categories: categories.data, products: products.data});
        }

        fetchData();
    }, []);

    const getData = async (query, queryingPage = 1, pageSize = 100) => {
        debugger;
        // prcatName DDOS backend
        if (state.loading) return;

        setState({...state, loading: true})

        console.log("querying page", queryingPage, pageSize);
        // //
        // // var result = await ApiService.Products.search(
        // //   query,
        // //   queryingPage,
        // //   pageSize
        // // );
        // //console.log(result.data);
        // const data = result.data.items;
        // const { page, totalPages } = result.data;
        // console.log("result", data, page, totalPages);
        // setState({ ...state, data, page, totalPages, loading: false });

    };

    const filterData = () => {
        let sortedData = []
        console.log(state.data);

        if (sort) {
            switch (sort) {
                case 'sortby=al-as':
                    sortedData = state.data.sort((a, b) => a.title < b.title ? -1 : 1)
                    break;

                case 'sortby=al-ds':
                    sortedData = state.data.sort((a, b) => a.title > b.title ? -1 : 1)
                    break;

                case 'sortby=pr-as':
                    sortedData = state.data.sort((a, b) => a.sellingPrice - b.sellingPrice)
                    break;

                case 'sortby=pr-ds':
                    sortedData = state.data.sort((a, b) => b.sellingPrice - a.sellingPrice)
                    break;

                default:
                    break;
            }
        }
        if (filterCat.length === 0) return state.data
        return state.data.filter(item => filterCat.includes(item.category.title)
        )
    }

    const handleCategoryClick = (catName, category) => {
        let newFilter = []
        if (filterCat.includes(catName)) {
            newFilter = filterCat.filter(i => i != catName)
        } else {
            newFilter = [...filterCat, catName]
        }
        setFilterCat(newFilter)

        const originalData = data.original;
        let tmpData = [];
        originalData.map((val, index) => {
            const tmp = val.category.title;
            if (tmp != null && tmp == category) {
                tmpData.push(val);
            }
        });
        setData({
            original: originalData,
            filtered: tmpData
        });
    }

    const showAllItems = () => {
        setData({
            original: data.original,
            filtered: data.original
        });
    }

    let query = "";
    const [sort, setSort] = useState(null)
    const getSortData = (data) => {
        let sortValue = data.target.value;
        if (sortValue == "1") {
            query = "sortby=al-as";
            setSort('sortby=al-as')
        } else if (sortValue == "2") {
            query = "sortby=al-ds";
            setSort("sortby=al-ds")
        } else if (sortValue == "3") {
            query = "sortby=pr-as";
            setSort("sortby=pr-as")
        } else if (sortValue == "4") {
            query = "sortby=pr-ds";

            setSort("sortby=pr-ds")
        }
    };

    //get data from back end
    // useEffect(() => {
    //   getData();
    // }, []);

    const onPageChange = (delta) => {
        console.log("delta", delta);
        getData(query, state.page + delta);
    };

    //get category list
    const totalCount = state.data.length;
    var count = [];
    var categories = state.data.map(function (item) {
        return item.category.title;
    });

    //count will be represent how many selling item for each category
    categories.forEach(function (item) {
        count[item] = (count[item] || 0) + 1;
        if (!uniqueCategories.includes(item)) {
            uniqueCategories.push(item);
            setPlantBoxes(oldArray => [...oldArray, {item: false}]);
            console.log('asdad: ' + plantCheckBoxes);
        }
    });

    const handleSellerClick = (e, seller) => {
        const originalData = data.original;
        let tmpData = [];
        originalData.map((val, index) => {
            const tmp = val.businessProfile.name;
            if (tmp != null && tmp == seller) {
                tmpData.push(val);
            }
        });
        console.log(tmpData, 'filtered');

        setData({
            original: originalData,
            filtered: tmpData
        });
    }
    console.log(data.filtered, 'data');

    //get seller list
    var sellers = state.data.map(function (item) {
        return item.businessProfile.name;
    });


    var countSellerItem = [];
    sellers.forEach(function (item) {
        countSellerItem[item] = (countSellerItem[item] || 0) + 1;
        if (!uniqueSellers.includes(item)) {
            uniqueSellers.push(item);
        }
    });

    const handleAddItem = (item) => {
        console.log(item, 'item');

        props.addItem(item);
    };
    //count total item to display at "All plants"
    const sortOptions = [
        {
            value: 0,
            description: "Sort by Popularity",
        },
        {
            value: 1,
            description: "Sort by A-Z",
        },
        {
            value: 2,
            description: "Sort by Z-A",
        },
        {
            value: 3,
            description: "Sort by price low to high",
        },
        {
            value: 4,
            description: "Sort by price high to low",
        },
    ];

    const {products} = state;
    return (
        <div>
            <BreadCrumbNCover pageName={pageName}/>
            {/* ##### Shop Area Start ##### */}
            <section className="shop-page section-padding-0-100">
                <div className="container">
                    <div className="row">
                        {/* Shop Sorting Data */}
                        <div className="col-12 d-none">
                            <div
                                className="shop-sorting-data d-flex flex-wrap align-items-center justify-content-between">
                                {/* Shop Page Count */}
                                <div className="shop-page-count">
                                    <p>
                                        Showing 1–{totalCount} of {totalCount} results
                                    </p>
                                </div>
                                {/* Search by Terms */}
                                <div className="search_by_terms d-none">
                                    <form action="#" method="post" className="form-inline">
                                        <select
                                            defaultValue={sortOptions[0].value}
                                            className="custom-select widget-title"
                                            onChange={getSortData}
                                        >
                                            {sortOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.description}
                                                </option>
                                            ))}
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Sidebar Area */}
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="shop-sidebar-area">
                                {/* Shop Widget */}
                                <div className="shop-widget catagory mb-50">
                                    <h4 className="widget-title">Categories</h4>
                                    <div className="widget-desc">
                                        {/* Single Checkbox */}
                                        {state.categories.map((item, index) => (
                                            <Category
                                                onChangeSelectedCategories={handleChangeSelectedCategories}
                                                data={state.selectedCategories}
                                                key={index}
                                                id={item.id}
                                                categoryName={item.title}
                                                onClick={handleCategoryClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* All Products Area */}
                        <div className="col-12 col-md-8 col-lg-9">
                            <div className="shop-products-area">
                                <div className="row">
                                    <ProductsView data={products}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ##### Shop Area End ##### */}

        </div>
    );
}

export default Shop; //connect co 2 bien, 1: lay data ve tu store. 2. trigger action

//store ->reducer -> action -> shop ->product
