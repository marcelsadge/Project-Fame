import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ForceGraph2D from 'react-force-graph-2d';
import SpriteText from 'three-spritetext';
import { ClipLoader } from 'react-spinners';

import { getClanMapData, getClanId } from '../../../api/apicalls';
import { Loader } from './styles';
import { SearchContainer } from '../SearchBar/styles';

function ClanMap() {
    const isMounted = useRef(false);
    const [loading, setLoading] = useState(true);
    const [clanId, setClanId] = useState('');
    const [adjMap, setAdjMap] = useState(null);
    const [uniqueClans, setUniqueClans] = useState([]);

    const location = useLocation();

    const getData = async () => {
        const id = await getClanId(location.state.clanName.toUpperCase());
        if (isMounted.current) {
            setClanId(id);
            const results = await getClanMapData(id)
                .then((result) => {
                    return result;
                });
            setAdjMap(results[0]);
            setUniqueClans(results[1]);
            setLoading(false);
        }
    }

    const generateClanGraph = () => {
        let edgeArray = [];
        const edges = Array.from(adjMap.keys());
        for (const element of edges) {
            let temp = {
                source: element[0],
                target: element[1],
                weight: adjMap.get(element),
            };
            edgeArray.push(temp);
        }
        const uniqueNodes = uniqueClans.map((clan) => ({
            id: clan.clan_id,
            name: clan.tag,
            color: clan.color,
            img: `https://na.wargaming.net/clans/media/clans/emblems/cl_476/${clan.clan_id}/emblem_256x256.png`,
        }));
        return {
            nodes: uniqueNodes,
            links: edgeArray
        };
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        isMounted.current = true;
        getData();
        return () => {
            isMounted.current = false;
            setAdjMap('');
            setClanId('');
            setLoading(false);
            setUniqueClans([]);
        };
    }, []);
    
    return (
            <>
            {loading ? 
                <Loader>
                    <ClipLoader 
                    size={150}
                    color={'white'}
                    loading={loading}
                    /> 
                </Loader>
                : 
                <ForceGraph2D
                    backgroundColor={"#252735"}
                    width={window.innerWidth * 0.99}
                    height={window.innerHeight}
                    graphData={generateClanGraph()}
                    nodeThreeObject={(node) => {
                        const sprite = new SpriteText(node.name, 10);
                        sprite.color = node.color;
                        sprite.padding = [8, 4];
                        sprite.textHeight = 5;
                        sprite.borderRadius = 10;
                        return sprite;
                    }}
                />
            }
            </>
    );
}

export default ClanMap;