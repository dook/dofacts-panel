import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Link as StyledLink, Paper } from '@material-ui/core';

import Lightbox from 'components/Lightbox';
import styles from './SubmissionDetails.module.scss';

const SubmissionDetails = ({ submission }) => {
  const { screenshot_url: image, url, text, comment } = submission;
  const [isOpen, setOpen] = useState(false);
  const reportDate = new Date(submission.reported_at).toLocaleString();

  return (
    <>
      <Paper className={styles.container} variant="outlined">
        <div>
          <img
            src={image}
            alt="Zrzut ekranu"
            className={styles.image}
            title="Powiększ zdjęcie"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className={styles.content}>
          {submission.is_sensitive && (
            <Typography paragraph>
              Słowa wrażliwe: {submission.newssensitivekeyword_set.map(keyword => keyword.name).join(', ')}
            </Typography>
          )}
          <Typography variant="caption" paragraph>
            Data zgłoszenia: {reportDate}
          </Typography>
          <Typography variant="h6" component="h2">
            Komentarz od użytkownika
          </Typography>
          <Typography paragraph>{comment}</Typography>
          <Typography variant="h6" component="h2">
            Treść informacji
          </Typography>
          <Typography paragraph>{text}</Typography>
        </div>
        <Button component={StyledLink} href={url} target="_blank" rel="noreferrer noopener" color="primary">
          Link źródłowy
        </Button>
      </Paper>
      <Lightbox isOpen={isOpen} url={image} onClose={() => setOpen(false)} />
    </>
  );
};

SubmissionDetails.propTypes = {
  submission: PropTypes.object
};

export default SubmissionDetails;
