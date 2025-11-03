import React from 'react';

const Footer = ({ completedTasksCount , activeTasksCount  }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
           DO VAN Great job! You have completed {completedTasksCount} tasks
            {activeTasksCount > 0 && (
              <> — {activeTasksCount} tasks are waiting to be processed, keep it up!</>
            )}
          </p>
        </div>
      )}

      {/* {completedTasksCount === 0 && activeTasksCount > 0 && (
        <> Let’s start with {activeTasksCount} tasks </>
      )} */}
    </>
  );
};

export default Footer;
