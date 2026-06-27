const WORK_DAY_HOURS = 24;
const MAX_ACTIVE_PROGRESS = 90;

const parseTimelineWorkingDays = (timeline) => {
  if (!timeline?.trim()) {
    return null;
  }

  const normalized = timeline.trim().toLowerCase();
  const rangeMatch = normalized.match(/(\d+)\s*[–—-]\s*(\d+)/);

  if (rangeMatch) {
    return Math.max(Number(rangeMatch[1]), Number(rangeMatch[2]));
  }

  const singleMatch = normalized.match(/(\d+)/);
  return singleMatch ? Number(singleMatch[1]) : null;
};

const getTimelineDurationMs = (timeline) => {
  const workingDays = parseTimelineWorkingDays(timeline);

  if (!workingDays || workingDays <= 0) {
    return null;
  }

  return workingDays * WORK_DAY_HOURS * 60 * 60 * 1000;
};

export const getAppealProgress = (appeal) => {
  if (appeal?.is_closed) {
    return {
      percent: 100,
      timeline: appeal.timeline || null,
    };
  }

  const durationMs = getTimelineDurationMs(appeal?.timeline);
  const createdAt = appeal?.created_at
    ? new Date(appeal.created_at).getTime()
    : null;

  if (!durationMs || !createdAt || Number.isNaN(createdAt)) {
    return null;
  }

  const elapsedMs = Math.max(Date.now() - createdAt, 0);
  const rawPercent = Math.round((elapsedMs / durationMs) * 100);
  const percent = Math.min(MAX_ACTIVE_PROGRESS, Math.max(0, rawPercent));

  return {
    percent,
    timeline: appeal.timeline,
  };
};
