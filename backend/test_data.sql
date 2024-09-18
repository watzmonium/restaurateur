INSERT INTO users (email, password) VALUES 
    ('a', '$2b$10$aWqEOXfoOLKSWD7s1Np/j.lnn94S.mJUQW4BXedEOeb7GT0RZtm1O'),
    ('b', '$2b$10$aWqEOXfoOLKSWD7s1Np/j.lnn94S.mJUQW4BXedEOeb7GT0RZtm1O'),
    ('c', '$2b$10$aWqEOXfoOLKSWD7s1Np/j.lnn94S.mJUQW4BXedEOeb7GT0RZtm1O'),
    ('d', '$2b$10$aWqEOXfoOLKSWD7s1Np/j.lnn94S.mJUQW4BXedEOeb7GT0RZtm1O');
 
INSERT INTO restaurants (google_id, name, rating) VALUES
    (1, 'franky d pizza', 5),
    (2, 'jade palace', 3),
    (3, 'ameriburgers', 1),
    (1, 'franky d pizza', 5);

INSERT INTO reviews (restaurant_id, dish_name, rating, review) VALUES
    (1, 'tuna scuda', 3, 'it was fine'),
    (1, 'pasta pizza', 2, 'it was not fine'),
    (4, 'tuna scuda', 1, 'i vomited'),
    (3, 'clams casino', 5, 'best clams casino this side of the mississippi'),
    (2, 'beans', 3, 'im thinkin about thos beans');

INSERT INTO users_restaurants (user_id, restaurant_id) VALUES
    (1, 1), (2, 3), (2, 4), (3, 2);