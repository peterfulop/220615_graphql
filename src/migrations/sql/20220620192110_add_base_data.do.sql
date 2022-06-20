INSERT INTO "categories" ("id", "name") values
    ('c01b1ff4-f894-4ef2-b27a-22aacc2fca70', 'Kitchen'),
    ('34115aac-0ff5-4859-8f43-10e8db23602b','Garden'),
    ('d914aec0-25b2-4103-9ed8-225d39018d1d','Sports')
;

INSERT INTO "products" ("id", "name", "description", "quantity", "price", "image", "onSale", "categoryId") values
    ('53a0724c-a416-4cac-ae45-bfaedce1f147', 'Steel Pot', 'Silver steel pot that is perfect for cooking', 230, 42.44, 'img-1', false,'c01b1ff4-f894-4ef2-b27a-22aacc2fca70'),
    ('c2af9adc-d0b8-4d44-871f-cef66f86f7f6', 'Salad Bowl', 'Round wooden bowl perfect for tossing and making salads', 33, 53.5, 'img-1', false,'c01b1ff4-f894-4ef2-b27a-22aacc2fca70'),
    ('2c931e7e-510f-49e5-aed6-d6b44087e5a1','Spoon','Small and delicate spoon', 4266, 1.33,'img-3', true,'c01b1ff4-f894-4ef2-b27a-22aacc2fca70'),
    ('404daf2a-9b97-4b99-b9af-614d07f818d7','Shovel','Grey rounded shovel for digging', 753, 332,'img-4', false,'34115aac-0ff5-4859-8f43-10e8db23602b'),
    ('6379c436-9fad-4b3f-a427-2d7241f5c1b1','Fertilizer','Nitrogen based fertitlizer', 53453, 23.11,'img-5', true,'34115aac-0ff5-4859-8f43-10e8db23602b'),
    ('f01bcdec-6783-464e-8f9e-8416830f7569','Basketball','Outdoor or indoor basketball', 128, 59.99,'img-6', true,'d914aec0-25b2-4103-9ed8-225d39018d1d'),
    ('a4824a31-5c83-42af-8c1b-6e2461aae1ef','Golf Clubs','Good for golfing', 3, 427.44,'img-7', false,'d914aec0-25b2-4103-9ed8-225d39018d1d'),
    ('b553085a-a7e0-4c9b-8a12-f971919c3683','Baseball Gloves','Professional catcher gloves', 745,77.0,'img-8', true,'d914aec0-25b2-4103-9ed8-225d39018d1d'),
    ('47bf3941-9c8b-42c0-9c72-7f3985492a5b','Soccer Ball','Round ball', 734, 93.44,'img-9', false,'d914aec0-25b2-4103-9ed8-225d39018d1d')
;

INSERT INTO "reviews" ("id", "date", "title", "comment", "rating", "productId") values
    ('b22da5d4-6a4b-4db5-8ec3-acc228c36260', '2021-01-01', 'This is bad', 'when i bought this it broke the stove', 1, '53a0724c-a416-4cac-ae45-bfaedce1f147'),
    ('78851fe8-a657-410f-9b0a-2bc952636e16', '2021-04-23', 'This is good', 'one of the most decent pots', 3, '53a0724c-a416-4cac-ae45-bfaedce1f147'),
    ('463c0f40-86bc-4b8e-be47-e363111991d1', '2020-04-23', 'is okay', 'yes it is decent i guess', 2, '53a0724c-a416-4cac-ae45-bfaedce1f147'),
    ('ebd207cd-f909-4bb1-8416-3e17a161b859', '2020-07-23', 'terrible', 'why is it so expensive', 1, '53a0724c-a416-4cac-ae45-bfaedce1f147'),
    ('92450802-24ef-4907-9c70-b82697a96882', '2021-01-01', 'best thing ever', 'really good bowl', 5, 'c2af9adc-d0b8-4d44-871f-cef66f86f7f6'),
    ('f7ca2f8e-74ed-4323-9166-c8b606c2238e', '2021-04-23', 'SUPER HAPPY', 'this is amazing, only 4 stars tho... :)', 4, 'c2af9adc-d0b8-4d44-871f-cef66f86f7f6'),
    ('908dbc7f-7782-43ae-9775-63bbd87db575', '2020-04-23', 'life changing', 'writing mock data is so boring...', 5, 'c2af9adc-d0b8-4d44-871f-cef66f86f7f6'),
    ('1852460f-b186-4a7a-a024-dccc0f72e052', '2020-07-23', 'This is coooooool!', 'I would totally recommend', 5, 'c2af9adc-d0b8-4d44-871f-cef66f86f7f6'),
    ('d075bdc8-df4b-4389-82ba-cb63726639ec', '2020-07-23', 'idc', 'It''s a spoon...', 3, '2c931e7e-510f-49e5-aed6-d6b44087e5a1'),
    ('1b2b32ba-acbd-4578-9455-30eb4c8f5c40', '2020-07-23', 'terrible!!!!!!', 'Not good at all!! used it once and got caught 2 days later. now im doing life without parole', 1, '404daf2a-9b97-4b99-b9af-614d07f818d7'),
    ('4480710a-e2b6-4dab-a227-43cb3ffca7b8', '2020-07-23', 'great', 'Great for planting', 5, '404daf2a-9b97-4b99-b9af-614d07f818d7'),
    ('57825f8c-6c13-4ddb-a90e-0c2be283972c', '2020-07-23', 'Made well', 'Strong an firm', 5, '404daf2a-9b97-4b99-b9af-614d07f818d7'),
    ('5b83af5b-e9fa-47e5-8ac8-faa7d420f2d5', '2020-07-23', 'Plants grew well', 'Oxygen and nitrogen rich!', 3, '6379c436-9fad-4b3f-a427-2d7241f5c1b1'),
    ('29120a7e-5c75-4b83-9a21-aa064e2abf37', '2020-07-23', 'I made the Nba', 'My name is LeBron James', 5, 'f01bcdec-6783-464e-8f9e-8416830f7569'),
    ('48e297a2-4b6c-48a2-ab68-6fe6b40cb660', '2020-07-23', 'I did not make the NBA', 'My name is Laith Harb', 5, 'f01bcdec-6783-464e-8f9e-8416830f7569'),
    ('74bc2895-1ee7-4b97-8f4d-d5818fc95b09', '2020-07-23', 'I love ball', 'I play basketball with this basketball', 5, 'f01bcdec-6783-464e-8f9e-8416830f7569'),
    ('e44b08ac-7b03-488e-83d6-0a85f0f0cecc', '2020-07-23', 'Gooooolf', 'I need golfing tips', 5, 'a4824a31-5c83-42af-8c1b-6e2461aae1ef'),
    ('6ee01595-c3b8-42a9-b0e0-ce3cb2beb7d6', '2020-07-23', 'meh', 'I dont''t like it', 3, 'a4824a31-5c83-42af-8c1b-6e2461aae1ef'),
    ('4dfdbb84-67f1-48cc-8682-1456413225ad', '2020-07-23', 'baseball...?', 'I thought this was for football', 5, 'b553085a-a7e0-4c9b-8a12-f971919c3683'),
    ('574f1c51-2483-44a7-8476-888905e1a711', '2020-07-23', 'soccer or football', 'IT''S CALLED FOOTBALL', 2, '47bf3941-9c8b-42c0-9c72-7f3985492a5b'),
    ('1e489691-6d19-4438-a6c5-90919eef070e', '2020-07-23', 'too small', 'ball is too same', 4, '47bf3941-9c8b-42c0-9c72-7f3985492a5b'),
    ('6c8bc709-f675-472e-ae84-f8c7d73e99af', '2020-07-23', 'got flat', 'The ball got as flat as the earth. I want it round!!!!', 2, '47bf3941-9c8b-42c0-9c72-7f3985492a5b')
;
