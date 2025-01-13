import { getMenuCategories } from "@/core/requests/homeRequests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { FC, useState } from "react";
import appleStore from "@/assets/images/appleStore.png";
import playStore from "@/assets/images/playStore.png";

interface Props {
  isHamburgerClicked: boolean;
  handleCloseIconClick: () => void;
}
const Navbar: FC<Props> = ({ isHamburgerClicked, handleCloseIconClick }) => {
  const [closeMenu, setCloseMenu] = useState(false);
  const [closeSubMenu, setCloseSubMenu] = useState(false);
  const [closeSecondMenu, setCloseSecondMenu] = useState(false);
  const [closeSecondSubMenu, setCloseSecondSubMenu] = useState(false);

  const { data: menuCategoryData } = useQuery({
    queryKey: ["menuCategoryData"],
    queryFn: () => getMenuCategories(),
  });
  return (
    <div className='header-navbar'>
      <div className='container'>
        <div className='header-bottom'>
          <nav>
            <div className='res-row-block'>
              <div className='main_menu'>
                <ul>
                  <li>
                    <a href='index.html' className='active'>
                      Home
                    </a>
                  </li>
                  <li className='has_dropdown'>
                    <a href='#'>
                      Make to Order <i className='fas fa-angle-down'></i>
                    </a>
                    <ul className='sub_menu'>
                      {menuCategoryData?.mtoc
                        ?.filter((cat) => cat.isp === true && cat.pcid === null)
                        .map((cat) => (
                          <React.Fragment key={cat.id}>
                            <li className='has_dropdown'>
                              <Link
                                href={`/make-to-order/category/${cat.n}`}
                                // onClick={() => setCloseSubMenu(!closeSubMenu)}
                              >
                                {cat.n}
                                <i className='fas fa-angle-right' />
                              </Link>
                              <ul
                                className={
                                  closeSubMenu ? "sub_menu open" : "sub_menu "
                                }
                              >
                                {menuCategoryData?.mtoc
                                  .filter((scat) => scat.pcid === cat.id)
                                  .map((scat, index) => (
                                    <li key={index} className='has_dropdown'>
                                      <Link
                                        href={`/make-to-order/${scat.id}-${scat.n}`}
                                        onClick={() => {
                                          handleCloseIconClick();
                                          setCloseSubMenu(!closeSubMenu);
                                        }}
                                      >
                                        {scat.n}{" "}
                                        <i className='fas fa-angle-right' />
                                      </Link>
                                      <ul
                                        className={
                                          closeSubMenu
                                            ? "sub_menu row category-menu open"
                                            : "sub_menu row category-menu "
                                        }
                                      >
                                        {menuCategoryData?.mtoc
                                          .filter(
                                            (sscat) => sscat.pcid === scat.id
                                          )
                                          .map((sscat, index) => (
                                            <li
                                              key={index}
                                              className='sub-menu-col'
                                            >
                                              <Link
                                                href={`/make-to-order/${sscat.id}-${sscat.n}`}
                                                onClick={() => {
                                                  handleCloseIconClick();
                                                  setCloseSubMenu(
                                                    !closeSubMenu
                                                  );
                                                }}
                                              >
                                                {sscat.n}
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          </React.Fragment>
                        ))}
                      {/* <li className='has_dropdown'>
                      <a href='#'>
                        Jewellery <i className='fas fa-angle-down'></i>
                      </a>
                      <ul className='sub_menu'>
                        <li className='has_dropdown'>
                          <a href='#'>
                            Pakistani <i className='fas fa-angle-down'></i>
                          </a>
                          <ul className='sub_menu row category-menu'>
                            <li className='sub-menu-col'>
                              <a href='#'>Necklace</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Long Necklace Set</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Pakistani Set</a>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Semi Bridal Set</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Full Bridal Set</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Rani Haar</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Earring</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Jhumka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Bali Jhumka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Earring Tikka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Jhumka Tikka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Bali Jhumka Tikka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Tops</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Bangles</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Payal</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Hip Chain</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Damini</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Mata Patti</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Pasa</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Kan Chain</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Choti</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Panja</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Braclets</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Finger Ring</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className='has_dropdown'>
                      <a href='#'>
                        Jewellery 02<i className='fas fa-angle-down'></i>
                      </a>
                      <ul className='sub_menu'>
                        <li className='has_dropdown'>
                          <a href='#'>
                            Pakistani <i className='fas fa-angle-down'></i>
                          </a>
                          <ul className='sub_menu row category-menu'>
                            <li className='sub-menu-col'>
                              <a href='#'>Necklace</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Long Necklace Set</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Pakistani Set</a>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Semi Bridal Set</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Full Bridal Set</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Rani Haar</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Earring</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Jhumka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Bali Jhumka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Earring Tikka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Jhumka Tikka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Bali Jhumka Tikka</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Tops</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Bangles</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Payal</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Hip Chain</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Damini</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Mata Patti</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Pasa</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Kan Chain</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Choti</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Panja</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Braclets</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>

                            <li className='sub-menu-col'>
                              <a href='#'>Finger Ring</a>
                              <ul className='position-initial'>
                                <li>
                                  <a href='#'>Reverse AD</a>
                                </li>
                                <li>
                                  <a href='#'>Kundan</a>
                                </li>
                                <li>
                                  <a href='#'>CZ AD Jewellery</a>
                                </li>
                                <li>
                                  <a href='#'>Polki Kundan</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li> */}
                    </ul>
                  </li>
                  <li className='mega_menu_dropdown mega_menu_demo_2 has_dropdown'>
                    <a href='#'>
                      Ready Stock <i className='fas fa-angle-down'></i>
                    </a>
                    <div className='mega_menu sub_menu'>
                      <div className='mega_menu_item'>
                        <h3>Jewellery</h3>
                        <a href='#'>Traditional</a>
                        <a href='#'>Pakistani</a>
                        <a href='#'>Store</a>
                      </div>
                      <div className='mega_menu_item'>
                        <h3>Jewellery 02</h3>
                        <a href='#'>Traditional</a>
                        <a href='#'>Pakistani</a>
                        <a href='#'>Store</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href='track-order.html'>Track Order</a>
                  </li>
                  <li>
                    <a href='contact-us.html'>Contact</a>
                  </li>
                  <li>
                    <a href='ordering-process.html'>Order Process</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className='hb-right'>
            {/* <span>Download App</span> */}
            <a href='#'>
              <img src={appleStore.src} className='app-icon' alt='appstore' />
            </a>
            <a href=''>
              <img src={playStore.src} className='app-icon' alt='playstore' />
            </a>

            {/* <a href=''>
            <BsApple size={25} />
          </a>
          <a href=''>
            <BsGooglePlay />
          </a> */}
          </div>
          <div className='close-icon-btn'>
            <i className='bi bi-x'></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
