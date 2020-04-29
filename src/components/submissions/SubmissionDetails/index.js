import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Link as StyledLink, Paper } from '@material-ui/core';

import Lightbox from 'components/Lightbox';
import styles from './SubmissionDetails.module.scss';

const SubmissionDetails = ({ submission }) => {
  const { t } = useTranslation();
  const { screenshot_url: image, url, text, comment } = submission;
  const [isOpen, setOpen] = useState(false);
  const reportDate = new Date(submission.reported_at).toLocaleString();

  return (
    <>
      <Paper className={styles.container} variant="outlined">
        <div>
          <img
            src={image}
            alt=""
            className={styles.image}
            title={t('details.zoomPhoto')}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className={styles.content}>
          {submission.is_sensitive && (
            <Typography paragraph>
              {t('details.sensitiveWords')}{' '}
              {submission.newssensitivekeyword_set.map(keyword => keyword.name).join(', ')}
            </Typography>
          )}
          <Typography variant="caption" paragraph>
            {t('details.reportedAt')} {reportDate}
          </Typography>
          <Typography variant="h6" component="h2">
            {t('details.userComment')}
          </Typography>
          <Typography paragraph>{comment}</Typography>
          <Typography variant="h6" component="h2">
            {t('details.informationContent')}
          </Typography>
          <Typography paragraph>{text}</Typography>
        </div>
        <Button component={StyledLink} href={url} target="_blank" rel="noreferrer noopener" color="primary">
          {t('details.sourceLink')}
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
