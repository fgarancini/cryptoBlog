USE [cryptoblog]
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 
GO
INSERT [dbo].[Usuarios] ( [mail], [username], [password], [type]) VALUES ('f.garancini15@gmail.com', 'fgarancini', '$2a$10$5B38YCqRGDLk99jnfbFdO.ZlNs/F1QKrSnwr4J04QfaCuEogPTgsC', 1)
GO
INSERT [dbo].[Usuarios] ( [mail], [username], [password], [type]) VALUES ('satoshiNaka@gmail.com', 'satoshiMan', '$2a$10$HxjQmNmC91pjBVAlKDcqw.ByFQ4JlX7FcyDOj//pZcuLk8qYynoE6', 2)
GO
INSERT [dbo].[Usuarios] ( [mail], [username], [password], [type]) VALUES ('shibarandomuser@gmail.com', 'shitmanA', '$2a$10$YvrwKVJoxpW3asBPRUIJTuF3UzUrldY2Qu0V5kSyPvkCfOuh2XNNS', 3)
GO
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
 
