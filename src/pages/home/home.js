import { Fragment, useEffect, useState } from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import ModelCarDetails from '../../components/ModelCarDetails/modelCarDetails';
import { fetchCarModels } from '../../redux/reduxSlices/carModelSlice';

const CarModelList = ({ carModelList }) => {
  let keyData = 1;
  return (
    <>
      {carModelList
        && carModelList.map((item, index) => {
          keyData += 1;
          if (index % 1.5 === 0) {
            return (
              <ModelCarDetails
                colour="different"
                key={keyData}
                vehicleLogoSrc="https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg"
                carModelName={item.data.attributes.name}
                numberOfModelsAvailable={item.data.attributes.number_of_models}
              />
            );
          }
          return (
            <ModelCarDetails
              key={keyData}
              vehicleLogoSrc="https://c8.alamy.com/comp/D12RG7/logo-of-the-make-alfa-romeo-of-the-italian-car-manufacturer-fiat-group-D12RG7.jpg"
              carModelName={item.data.attributes.name}
              numberOfModelsAvailable={item.data.attributes.number_of_models}
            />
          );
        })}
    </>
  );
};

CarModelList.propTypes = {
  carModelList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const carModels = useSelector((state) => state.carModels);

  useEffect(() => {
    // Fetch items from other resources.
    const endOffset = itemOffset + itemsPerPage;
    if (carModels.carModels.length !== 0) {
      setCurrentItems(carModels.carModels.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(carModels.carModels.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, carModels]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % carModels.carModels.length;
    setItemOffset(newOffset);
  };

  return (
    <>
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
