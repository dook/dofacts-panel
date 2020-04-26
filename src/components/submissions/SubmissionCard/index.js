import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardActions, Typography, Button, Link as StyledLink, Chip } from '@material-ui/core';

import { appUrls } from 'urls';
import { resolveUrl } from 'utils/url';
import styles from './SubmissionCard.module.scss';

const getVerdict = (t, verdict, isDuplicate, isSensitive) => {
  if (isDuplicate) return t('submissions.duplicate', 'Duplikat');
  if (isSensitive) return t('submissions.sensitive', 'Wrażliwe słowa');
  return t(`verdictTypes.${verdict}`);
};

// TODO: split card to submission and history version
const SubmissionCard = ({
  id,
  text,
  url,
  image,
  reportDate,
  hasOpinion,
  verdict,
  isDuplicate,
  isSensitive,
  // props for history card
  title,
  isHistory // temporary solution, do it better in next iteration
}) => {
  const { t } = useTranslation();
  const verdictClass = cx(styles.verdict, {
    [styles.verdictTrue]: verdict === 'true',
    [styles.verdictFalse]: verdict === 'false',
    [styles.verdictSensitive]: isSensitive
  });

  const formatedReportDate = reportDate && new Date(reportDate).toLocaleString();
  const verdictLabel = getVerdict(t, verdict, isDuplicate, isSensitive);

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.image} image={image} title="" />
      <div className={styles.content}>
        <div className={styles.header}>
          {title && <Typography component="h2">{title}</Typography>}
          {verdictLabel && <Chip label={verdictLabel} className={verdictClass} />}
        </div>
        <div className={styles.subheader}>
          {formatedReportDate && <Typography variant="caption">{formatedReportDate}</Typography>}
          {hasOpinion && <Chip label="Zweryfikowane przez Ciebie" className={verdictClass} />}
        </div>
        <Typography className={styles.text} paragraph>
          {text}
        </Typography>
        <CardActions className={styles.actions}>
          <StyledLink href={url} target="_blank">
            {t('submissions.sourceLink')}
          </StyledLink>
          <Button
            component={Link}
            to={resolveUrl(isHistory ? appUrls.HISTORY.DETAILS : appUrls.SUBMISSIONS.DETAILS, { id })}
            variant="contained"
            color="primary"
          >
            {t('submissions.details')}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

SubmissionCard.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  verdict: PropTypes.string,
  reportDate: PropTypes.string,
  hasOpinion: PropTypes.bool,
  isHistory: PropTypes.bool,
  isDuplicate: PropTypes.bool,
  isSensitive: PropTypes.bool
};

export default SubmissionCard;
