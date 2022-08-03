import React, { useState, useEffect } from 'react';
import { updateWebsite, createSection } from 'store/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import SiteLayout from 'pages/SiteLayout';
import ContentSection from 'organisms/ContentSection';
import GraphicSection from 'organisms/GraphicSection';
import IconSection from 'organisms/IconSection';
import MailingSection from 'organisms/MailingSection';
import SellingSection from 'organisms/SellingSection';

const WebsiteView = ({ admin, draft, host }) => {
  const { id } = useParams();
  const wid = id ? id : host;
  const website = useSelector(state => state.firestore.data[wid]);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ storeAs: wid, collection: 'websites', doc: wid }]);
  const dispatch = useDispatch();
  const [data, setData] = useState(website && [...website.sections]);
  useEffect(() => { setData(website && [...website.sections]) }, [website]);
  const access = website && admin && auth.email === website.email;
  const vision = website && draft && auth.email === website.email;
  const random = Math.random().toString(16).slice(2);

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
    <SiteLayout
      admin={access || vision}
      website={website}
    >
      <DragDropContext onDragEnd={onDragEnd}>
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
                      {...provided.dragHandleProps}
                    >
                      <Box>
                        {item.type === 'content' && <ContentSection
                          section={item}
                          admin={access}
                          website={website}
                        />}
                        {item.type === 'graphic' && <GraphicSection
                          section={item}
                          admin={access}
                          website={website}
                        />}
                        {item.type === 'icon' && <IconSection
                          section={item}
                          admin={access}
                          website={website}
                        />}
                        {item.type === 'mailing' && <MailingSection
                          section={item}
                          admin={access}
                          website={website}
                        />}
                        {item.type === 'selling' && <SellingSection
                          section={item}
                          admin={access}
                          website={website}
                        />}
                      </Box>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {website && !website.sections.length && <Button
        onClick={() => dispatch(createSection({
          values: { id: random, type: 'content' },
          wid: website.name,
        }))}
        variant='outlined'
        size='small'
      >
        Add Section
      </Button>}
    </SiteLayout>
  )
};

export default WebsiteView;
