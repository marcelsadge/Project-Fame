import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBars, FaMap, FaChartLine, FaBloggerB, FaMailBulk } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { GiStarsStack } from 'react-icons/gi'
import { TbBrandCampaignmonitor } from 'react-icons/tb';

import { useNavigate } from 'react-router-dom';

import PageContext from '../../Context/pagecontext';

const SideBarComponent = styled.div`
    background-color: #111111;
    font-family: Segoe UI;
    position: fixed;
    height: 100%;
    width: 290px;
    border-right: 1px solid #242c30;
`;

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const SideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(235px, 1fr));
  grid-gap: 20px;
`;

const SideTable = styled.div`
    display: flex;
    flex-direction: column;
`;

const SideRow = styled.div`
    display: flex;
    padding: 10px;
    column-gap: 10px;
    width: 260px;
    margin-left: 30px;
    &:hover {
        background-color: #28b48c;
        background: linear-gradient(to right, #111111 99%, #28b48c 1%);
        cursor: pointer;
    }
`
const SideLink = styled.a`
  color: #28b48c;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
`;

const Title = styled.div`
    font-weight: normal;
    color: white;
    font-size: 24px;
    padding: 20px;
    text-align: center;
`

function SideBar({ show }) {
    const {currContext, setContext} = useContext(PageContext);

    const navigation = useNavigate();

    const handleOnClick = (navi) => {
        setContext(navi);
    };

    useEffect(() => {
        navigation(currContext);
    }, [currContext]);
    
    return (
        <SideBarComponent>
            <Title>
                In Progress Project
            </Title>
            <SideContainer>
                <SideGrid>
                    <SideTable>
                        <SideRow onClick={() => handleOnClick('/')}>
                            <FiHome size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Home
                            </SideLink>
                        </SideRow>
                        <SideRow onClick={() => handleOnClick('/marks')}>
                            <GiStarsStack size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Marks of Excellence
                            </SideLink>
                        </SideRow>
                        <SideRow onClick={() => handleOnClick('/stats')}>
                            <FaChartLine size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Trends
                            </SideLink>
                        </SideRow>
                        <SideRow onClick={() => handleOnClick('/clanmapsearch')}>
                            <FaMap size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Clan Map
                            </SideLink>
                        </SideRow>
                        <SideRow onClick={() => handleOnClick('/campaignstats')}>
                            <TbBrandCampaignmonitor size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Campaign Stats
                            </SideLink>
                        </SideRow>
                        <SideRow onClick={() => handleOnClick('/blog')}>
                            <FaBloggerB size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Blog
                            </SideLink>
                        </SideRow>
                        <SideRow onClick={() => handleOnClick('/contact')}>
                            <FaMailBulk size={'23px'} color={'#28b48c'} />
                            <SideLink>
                                Contact
                            </SideLink>
                        </SideRow>
                    </SideTable>
                </SideGrid>
            </SideContainer>
        </SideBarComponent>
    );
}

export default SideBar;