import React from 'react';
import styles from "./styles.module.css"
import { useState } from 'react'
import 'leaflet/dist/leaflet.css'

export default function SearchBar({ placeholder, data ,onSearchResult}) {

  //搜尋filter
  const [value, setValue] = useState('');
  const [filterData, setFilterData] = useState([]);
  const onChange = (event) => {
    const searchItem = event.target.value;
    setValue(searchItem);
    if (searchItem === '') {
      setFilterData([]); // Clear the suggestions
    } else {
      const newFilter = data.filter((item) => {
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      }).slice(0, 10);
      setFilterData(newFilter);
    }
  }

  const onSearch = (searchItem) => {
    setValue(searchItem);
    console.log("內容:", searchItem);
    onSearchResult(searchItem);
    setFilterData([]);
  }
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <input id="searchbar" type="text" placeholder={placeholder} value={value} onChange={onChange}
          style={{ width: '30vw', height: '4vh', borderStyle: 'solid', borderRight: 'none' }} />
        <button className={styles.searchButton} onClick={() => onSearch(value)}>搜尋</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {filterData.length !== 0 && (
          <div className={styles.suggestion}>
            {filterData.map((item, index) => (
              <div onClick={() => { onSearch(item.name) }} key={index} style={{ display: 'flex' }}>{item.name}</div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
