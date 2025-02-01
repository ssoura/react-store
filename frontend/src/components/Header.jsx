import styled from 'styled-components';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';
import { Menu } from 'lucide-react';
import Center from './Centert';
import {useContext, useState} from "react";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

// const TopBar = styled.div`
//   background-color:rgba(244, 244, 244, 0.75);
//   color: black;
//   font-size: 0.8rem;
//   padding: 10px 5px;
//   border-bottom: 1px solid #ccc;

// `;
// const TopBarContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// `;

// // Styled Components
// const StyledHeader = styled.header`
//   background-color:rgba(244, 244, 244, 0.75);
//   color: black;
//   padding: 10px 0;
//   border-bottom: 1px solid #ccc;
// `;

// const Navbar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// `;

// const Brand = styled(Link)`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: black;
//   text-decoration: none;
// `;

// const Toggle = styled.div`
//   display: none;
// `;

// const Nav = styled.nav`
//   display: flex;
//   align-items: center;
// `;

// const NavLink = styled(Link)`
//   color: black;
//   margin-left: 15px;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   position: relative;

//   &:hover {
//     color:rgb(60, 60, 60);
//   }
// `;

// const Badge = styled.span`
//   background-color: #28a745;
//   color: black;
//   border-radius: 50%;
//   font-size: 0.8rem;
//   padding: 2px 8px;
//   position: absolute;
//   top: -5px;
//   right: -10px;
// `;

// const Dropdown = styled.div`
//   position: relative;
//   margin-left: 15px;
// `;

// const DropdownToggle = styled.div`
//   cursor: pointer;
//   color: #18bc9c;

//   &:hover {
//     color: #18bc9c;
//     font-weight: bold;
//   }
// `;

// const DropdownMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: white;
//   border-radius: 4px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//   z-index: 100;
//   display: none;

//   ${Dropdown}:hover & {
//     display: block;
//   }
// `;

// const DropdownItem = styled(Link)`
//   padding: 10px 20px;
//   color: black;
//   text-decoration: none;
//   display: block;

//   &:hover {
//     background-color: #f8f9fa;
//   }
// `;


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [mobileNavActive,setMobileNavActive] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>

      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo to={'/'}>Ecommerce</Logo>
            <StyledNav mobileNavActive={mobileNavActive}>
              {userInfo ? (
                <>
                  <NavLink to={'/'}>Home</NavLink>
                  <NavLink to={'/admin/productlist'}>All products</NavLink>
                  <NavLink to={'/admin/orderlist'}>Categories</NavLink>
                  <NavLink to={'/admin/userlist'}>Account</NavLink>
                  <NavLink to={'/cart'}>Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</NavLink>
                </>
              ) : (<>
                              <NavLink to={'/login'}>Login</NavLink>
              </>)}

              {userInfo && userInfo.isAdmin && (
                <>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/admin/productlist'}>All products</NavLink>
                <NavLink to={'/admin/orderlist'}>Categories</NavLink>
                <NavLink to={'/admin/userlist'}>Account</NavLink>
                <NavLink to={'/cart'}>Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</NavLink>
              </>)}

            </StyledNav>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <Menu />
            </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>


    </>
  );
};

export default Header;

    // <StyledHeader>
    //   <Navbar>
    //     <Brand to="/">Computech</Brand>
    //     <Toggle>
    //     <Menu />
    //     </Toggle>
    //       <SearchBox />
    //     <Nav>
    //       <NavLink to="/cart">
    //         <FaShoppingCart /> Cart
    //         {cartItems.length > 0 && (
    //           <Badge>{cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>
    //         )}
    //       </NavLink>
    //       {userInfo ? (
    //         <Dropdown>
    //           <DropdownToggle>{userInfo.name}</DropdownToggle>
    //           <DropdownMenu>
    //             <DropdownItem to="/profile">Profile</DropdownItem>
    //             <DropdownItem as="button" onClick={logoutHandler}>
    //               Logout
    //             </DropdownItem>
    //           </DropdownMenu>
    //         </Dropdown>
    //       ) : (
    //         <NavLink to="/login">
    //           <FaUser /> Sign In
    //         </NavLink>
    //       )}
    //       {userInfo && userInfo.isAdmin && (
    //         <Dropdown>
    //           <DropdownToggle>Admin</DropdownToggle>
    //           <DropdownMenu>
    //             <DropdownItem to="/admin/productlist">Products</DropdownItem>
    //             <DropdownItem to="/admin/orderlist">Orders</DropdownItem>
    //             <DropdownItem to="/admin/userlist">Users</DropdownItem>
    //           </DropdownMenu>
    //         </Dropdown>
    //       )}
    //     </Nav>
    //   </Navbar>
    // </StyledHeader>