import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Search.css'
const Search = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }
return (
    <form onSubmit={handleSubmit} className='searchBarContent'>
      <input type="text" placeholder='search here...' className='searchBarInput' />
      <button type="submit" className='searchBarBtn'> 
      <SearchIcon fontSize='small' />
      </button>
    </form>
  )
}

export default Search