import React, { useEffect, useState } from 'react';
import Table from "./components/Table/Table";
import './App.css'
import SearchAndPagination from "./components/SearchAndPagination/SearchAndPagination";

function App() {
  const [orders, setOrders] = useState([]);
  const [fakturas, setFakturas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      const fetchOrders = () => {
          fetch(`http://localhost:3001/api/orders?startsWith=${searchQuery}&dir=desc&page=${currentPage}`)
              .then(response => response.json())
              .then(data => {
                  const orders = data?.winstrom?.['objednavka-prijata'] || [];
                  setOrders(orders);
              })
              .catch(error => console.error('Error fetching orders:', error));
      };


      fetchOrders();
      const fetchFakturas = () => {
          fetch('http://localhost:3001/api/faktura')
              .then(response => response.json())
              .then(data => {setFakturas(data['winstrom']['faktura-vydana'])
              })
              .catch(error => console.error('Error fetching fakturas:', error));
      };
    fetchFakturas();
  }, [searchQuery, currentPage]);




  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
      <div>
        <SearchAndPagination
            onSearch={handleSearch}
            onPageChange={handlePageChange}
            currentPage={currentPage}
        />
        <Table orders={orders} fakturas={fakturas} />
      </div>
  );
}

export default App;