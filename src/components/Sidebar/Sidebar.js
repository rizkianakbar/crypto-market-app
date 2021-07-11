import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Sidebar.css'
const Sidebar = (props) => {
  const [search, setSearch] = useState('');
  const [btnSidebar, setBtnSidebar] = useState(false)
  const [btnType, setBtnType] = useState('bx-menu')

  const { data: coins } = useFetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&order=market_cap_desc&per_page=100&page=1&sparkline=false://api.quotable.io/random')

  localStorage.setItem('data', JSON.stringify(coins))
  const handleChange = e => setSearch(e.target.value);


  const onClickBtn = () => {
    if (btnType === 'bx-menu') {
      setBtnType('bx-menu-alt-right')
      setBtnSidebar('active')
    } else {
      setBtnSidebar(false)
      setBtnType('bx-menu')
    }
  }
  useEffect(() => {
    props.onCollapse(btnSidebar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btnSidebar])
  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  })

  const onClickSymbol = () => {
    if (btnSidebar === 'active') {
      setBtnSidebar('')
      setBtnType('bx-menu')
    } else {
      setBtnSidebar('active')
      setBtnType('bx-menu-alt-right')
    }
  }


  return (
    <>
      <div className={`sidebar ${btnSidebar}`}>
        <div className="logo_content">
          <div className="logo">
            <i className='bx bxl-c-plus-plus' />
            <div className="logo_name">KangKripto</div>
          </div>
          <i className={`bx ${btnType}`} id='btn' onClick={onClickBtn} ></i>
        </div>
        <ul className="nav_list list-unstyled">
          <li>
            <i className='bx bx-search' onClick={onClickSymbol} />
            <input className='coin-input' type="text" placeholder="Search" onChange={handleChange} />

            <span className="tooltip">Search</span>
          </li>
          <div className="scrollable">
            {filteredCoins.map(coin => {
              return (
                <li key={coin.id}>
                  <Link to={`/${coin.id}`}>
                    <i>
                      <img src={coin.image} alt="crypto" />
                    </i>
                    <span className="links_name">{coin.name}</span>
                  </Link>
                </li>
              )
            })}
          </div>
        </ul>
      </div>
      {/* <div className="home_content"> */}
      {/* </div> */}
    </>
  )
}
export default Sidebar
