import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';

export default function Cube(props) {

  React.useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://cdn.cubing.net/js/cubing/twisty";
    script.type= "module";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <>
      <twisty-player
                    visualization="PG3D"
                    control-panel="none"
                    background="none"
                    alg={props.scramble}
                    >
      </twisty-player>

        <div className="dragIconAndText">
          <FontAwesomeIcon icon={faUpDownLeftRight} className="upDownLeftRight fa-lg" color="white"/>
          <p className="dragText">&nbsp;&nbsp;&nbsp;Drag cube to view</p>
        </div>
     </>
  );
}