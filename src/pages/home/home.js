import { Fragment, useEffect, useState } from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import ModelCarDetails from '../../components/ModelCarDetails/modelCarDetails';
import { fetchCarModels } from '../../redux/reduxSlices/carModelSlice';

const CarModelList = ({ carModelList }) => (
  <>
    {carModelList.map((item, index) => {
      if (index % 2 === 0) {
        return (
          <ModelCarDetails
            key={item.data.id}
            modelId={item.data.id}
            vehicleLogoSrc={item.data.attributes.sourceLogoUrl} // "https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg"
            carModelName={item.data.attributes.name}
            numberOfModelsAvailable={item.data.attributes.number_of_models}
          />
        );
      }
      return (
        <ModelCarDetails
          key={item.data.id}
          modelId={item.data.id}
          vehicleLogoSrc={item.data.attributes.sourceLogoUrl} // "https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg"
          carModelName={item.data.attributes.name}
          numberOfModelsAvailable={item.data.attributes.number_of_models}
        />
      );
    })}
  </>
);

CarModelList.propTypes = {
  carModelList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [carSearchModelData, setCarSearchModelData] = useState([]);

  const carModels = useSelector((state) => state.carModels);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(carModels.carModels);
  });

  const onSearchFilterEventListener = (event) => {
    const lowerCaseCarModelArray = carModels.carModels.map(
      (element) => (
        {
          ...element,
          data: {
            ...element.data,
            attributes: {
              ...element.data.attributes,
              name: element.data.attributes.name.toLowerCase(),
            },
          },
        }
      ),
    );
    const newFilterArray = lowerCaseCarModelArray.filter(
      (element) => element.data.attributes.name.includes(event.target.value),
    );
    setCarSearchModelData(newFilterArray);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (filteredData.length !== 0) {
      if (carSearchModelData.length !== 0) {
        setCurrentItems(carSearchModelData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(carSearchModelData.length / itemsPerPage));
      } else {
        setCurrentItems(filteredData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredData.length / itemsPerPage));
      }
    }
  }, [itemOffset, itemsPerPage, filteredData, carSearchModelData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <p className="car-model-search"> Enter Car Model to Search </p>
      <input onChange={onSearchFilterEventListener} />
      <CarModelList carModelList={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="-->"
        previousLabel="<--"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

PaginatedItems.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
};

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarModels());
  }, []);
  return (
    <>
      <p className="subMainHeaderText">STATS By Models</p>
      <div className="mainEstimateGrid">
        <PaginatedItems itemsPerPage={10} />
      </div>
    </>
  );
};

export default Home;
