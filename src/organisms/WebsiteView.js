import React, { useState, useEffect } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { Box, Button, Typography } from '@mui/material';
import WebsiteExit from 'atoms/WebsiteExit';
import WebsiteOptions from 'atoms/WebsiteOptions';
import SectionCreate from 'atoms/SectionCreate';
import BlockTemplate from 'molecules/BlockTemplate';
import HeaderSection from 'molecules/HeaderSection';
import FooterSection from 'molecules/FooterSection';

const WebsiteView = ({ admin, host }) => {
  const { id } = useParams();
  const wid = id ? id : host;
  const website = useSelector(state => state.firestore.data[wid]);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ storeAs: wid, collection: 'websites', doc: wid }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Box sx={{
      color: (website && website.style && website.style.fontcolor) || '#444444',
      bgcolor: (website && website.style && website.style.backgroundcolor) || '#f5f5f5',
    }}>
      {access && <WebsiteExit />}
      {access && <WebsiteOptions website={website} />}
      {access && website && !website.sections.length && <Box
        sx={{ py: 5.5, display: 'flex', justifyContent: 'center' }}
      >
        <SectionCreate wid={website.name} index={0} start />
      </Box>}
      {website && website.header && (website.public || access) && <HeaderSection
        admin={access} header={website.header} wid={website.name}
      />}
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
                        section={item}
                        wid={website.name}
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
      {!access && website && website.public &&
        data && data.map(item =>
          <BlockTemplate
            admin={access}
            section={item}
            wid={website.name}
            key={item.id}
          />
        )}
      {website && website.footer && (website.public || access) && <FooterSection
        admin={access} footer={website.footer} wid={website.name}
      />}
      {!access && !(website && website.public) &&
        <Box sx={{ textAlign: 'center', m: 5 }}>
          <Typography variant='h6'>
            Page not public
          </Typography>
          <Button
            onClick={() => navigate('/')}
            size='small'
          >
            Modular Page
          </Button>
        </Box>
      }
    </Box>
  )
};

export default WebsiteView;
