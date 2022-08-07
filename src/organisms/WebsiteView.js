import React, { useState, useEffect } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { Box } from '@mui/material';
import WebsiteExit from 'atoms/WebsiteExit';
import WebsiteOptions from 'atoms/WebsiteOptions';
import SectionCreate from 'atoms/SectionCreate';
import BlockTemplate from 'molecules/BlockTemplate';

const WebsiteView = ({ admin, host }) => {
  const { id } = useParams();
  const wid = id ? id : host;
  const website = useSelector(state => state.firestore.data[wid]);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ storeAs: wid, collection: 'websites', doc: wid }]);
  const dispatch = useDispatch();
  const [data, setData] = useState(website && [...website.sections]);
  useEffect(() => { setData(website && [...website.sections]) }, [website]);
  const access = website && admin && auth.email === website.email;

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const items = data;
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);
    setData(items);
    dispatch(updateWebsite({
      values: { sections: items },
      wid: website.name,
    }));
  };

  return (
    <Box>
      {access && <WebsiteExit />}
      {access && <WebsiteOptions website={website} />}
      {access && website && !website.sections.length && <Box
        sx={{ py: 3, display: 'flex', justifyContent: 'center' }}
      >
        <SectionCreate wid={website.name} index={0} start />
      </Box>}
      {access && <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data && data.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <BlockTemplate
                        admin={access}
                        website={website}
                        section={item}
                        index={index + 1}
                        drag={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>}
      {!access && data && data.map(item =>
        <BlockTemplate
          admin={access}
          website={website}
          section={item}
          key={item.id}
        />
      )}
    </Box>
  )
};

export default WebsiteView;
