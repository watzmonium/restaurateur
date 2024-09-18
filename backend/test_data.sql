INSERT INTO users (email, password) VALUES 
    ('a', '$argon2id$v=19$m=65536,t=3,p=4$ly5L2vAZ1059+cHp4KgWBg$pcvyMM6+hYZWdpjdF509qHOrckV2UbhrCpvOETGGq98'),
    ('b', '$argon2id$v=19$m=65536,t=3,p=4$9z3bVQ6r33NqZ7wRYsZXrA$jrzifgtl8259oAc1eB7dGQ0tM3N3LZmDxuHjtXsoxIk'),
    ('c', '$argon2id$v=19$m=65536,t=3,p=4$D8Raxv0LCZp6dtuGAQMxIA$I25aDsFdGbO2+hod4lRDzYKdSnNvU7OjP2Od535UyQU'),
    ('d', '$argon2id$v=19$m=65536,t=3,p=4$riqCUPikitGo1abSBwPuzA$ihqKtIIRb68d4RluRct9BW8vra4dXDNSE5LXbF+ugG0');
 
INSERT INTO restaurants (google_id, name, rating) VALUES
    (1, 'franky d pizza', 5),
    (2, 'jade palace', 3),
    (3, 'ameriburgers', 1);

INSERT INTO reviews (restaurant_id, dish_name, rating, review) VALUES
    (1, 'tuna scuda', 3, 'it was fine'),
    (1, 'tuna scuda', 1, 'i vomited'),
    (3, 'clams casino', 5, 'best clams casino this side of the mississippi'),
    (2, 'beans', 3, 'im thinkin about thos beans');

INSERT INTO users_restaurants (user_id, restaurant_id) VALUES
    (1, 1), (2, 3), (2, 1), (3, 2);