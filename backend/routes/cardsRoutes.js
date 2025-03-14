import express from "express";

const router = express.Router();

const cards = [
  //
  {
    id: 1,
    name: "Aerodactyl",
    power: 100,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739297372322_aerodactyl-pok%C3%83%C2%A9mon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=SVqvby2GStA1tOfRRLCet8sfx1Wwt9mhN18bon1QGhRBgtJ7r%2BAfT6LpdOiehFH5wXhzXjVhUGdcEuWKjXyUbztr5NNbULsz42lsxD2qo4AaLG5PutNEGuYZxQ4wu2LLD8NNzq3hAEJsPUIGc5oM14vD87gJ6bFBi5zzutFuhUZDtQcjQUNjzaR6tgj5zpi0TfgnTh8Jmd%2FwKTCEskomSiq9QRXv%2FJNiEWeFT76wESeJGDnZAOlYax6OlRX%2BP521AH6alPvNhGwIa3YsjKhfy%2FkCA%2BRCLIZwfE5L1aJ7oomobDg8%2BhIkCJVno6%2BpG5p9jt50I227beiMNH9stEsEOA%3D%3D",
  },
  //
  {
    id: 2,
    name: "Groudon",
    power: 90,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739279675496_groudon-guraadon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=PGIvwkdYuYWfhFFKXpOhSJGTk9owiND226yxoOYx%2BYZ0xZPVXtXrKa5IRsqpA%2FV3eLbpF1GQbDCU34fNt23EBXxdgke1tHI519Hmwz5oc8oLkPW2ypvuwD9%2B%2F6RkwlYSRkJ%2FlpJEV0GIB6LfH7Rh1eWWJaCyvuD48GvMFVdEEDCNUZTVcXjxSJf5SwDk9QBx2SMyEcgQOWdED%2F3nMehrvIzo1yTvj7QjEPY0T8Y28wqf6CrVH7IYXmOAy8%2F004hgfZlKJ%2BHT9d7OBYIYIQYORObdgluQfIJLinyWT0VgKNn4071aF4f4pnKLFnkAmgghxyxkkiHeCVAS%2FbmVmQUOAw%3D%3D",
  },
  //

  {
    id: 3,
    name: "roudon-",
    power: 80,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739297592785_aggron-pok%C3%83%C2%A9mon-aggron.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=SW%2FjDsGJnIeWpvegLCEerXYwWOQwDGvuvfG4ghOLIlTHm3yjh7LBw6onxujkyLGhp5OemAox%2B8IKp8JbODW2iZ42O0jPO9ouRXQOo3B2YiDL7CIuyyr9%2Fs9euB8Kh2wvqfYE0drnmy7vwQeofl5xzPuBl6FE8oMzmy83FcQzHLUtUrLwfxIDbKpOUMKxaCb8kCpD30IOYbX8RVqa4erstn%2BC2usL9yOboBNWxUfTcaqmc%2F8bi0r2MHHPR5xLlAV305zOwB6BJY%2FVRuuCtDyAy3kfeGtnRMo%2FZE1HPAnpwSeXwl0p6QigwuhxBWAvKHB36RuCnyPzBfex4X1EJBTowg%3D%3D",
  },
  //

  {
    id: 4,
    name: "Archen",
    power: 70,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537413423_archen-pokemon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=CbkMwpNMIHZKQOe5%2F7Q3sx37NHu9uI%2FkhMUC%2Bf0j5nhFRBtwaZdt%2BDQ70%2Fm2h5LLNHkNNdVdXnFzzAMToWKtlVZXNcFut64Ck1wOYYTpBV5dk%2BmcGDmkRIQu8USdHXXBVUQpWZ5aqa2iSPN7V8x4WwW0XzbG6d9Liql385qRujri79M%2Fm1xXZkJHKGJpN8R6LZvGKCKSP2cV2d7CTp9Iy8LZ10wxAlTNY5jSfQb4W0yF%2FxOqEuEf3ooVckC1HnDpLj8j%2B%2Fy%2BDeFFN80pr80lOHrD2gCKKy8ytkn3Pum87ptUA0mf%2F2zQef%2FZ7gEXdPNhiyp0TyPFvwG%2FD7dh1xrkCQ%3D%3D",
  },
  {
    id: 5,
    name: "Aurorus",
    power: 60,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537554324_aurorus-ice-dinosaur.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=ifL2iUeEAtycUYDHv40%2F6q5s0kpzBKtWyGIJxLSL1OZpfZDSa%2FOHmL7jgqy8LJWbqtnNX2pssUuTTjcHH7WCogkECw4Ds6Du0mBvJSITlOiM1SzI2kirBOdidxEstnECADJUNBk%2F7zLYas3BotfAmVugh1KxAVRe2SW8pCRRqox%2FGSxvd8Rzn0DKzYIh086%2FzG30lseEwvXd7fVwxS%2BoC0YLvaMf7a9O7uRYx8ULcQun%2B3tK0VLHruZLAGQZzaimKcYm5vHajasnHeneNjxay%2BfzRqUk9J2BZ3zEqWs7u45soQ7CkXEerK0dC04sG6azrRfv3TAOoTkorMyXB59kXw%3D%3D",
  },
  {
    id: 6,
    name: "Cranidos",
    power: 50,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537618585_cranidos-rampardos.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=cgHOtbnRtx%2BKgTk0NTFsyJxgW6Z%2FpTSczoOL6JAVxL9Xw3AlIQSDvFG%2Bhvxkm%2BpP8qaP3rHAfr1x0UIkK9fzbiEWOpWxHdZxrLT44F2Ok2X8Tx45k81mJ8g6qNX2YbpE5Lw%2F%2BaG1EKRUiMthQ2kk0kqwJ6llk0i1V2aO0Fd2z93JWlWZFw%2BoX1X54l%2F%2Fn137UO8Wfiu%2BZH4QXtggz0l0XjzUmkZWhn88CrRFPjq%2BSh0yc4laDOhsSfIKpK7dCukn%2FGaT%2BHT%2BnuhU%2F5NwXhzMXu5HuvRFoI%2FSdG4FRx4aFRJMeNKqU7%2Br7SiPBbleSnRTt8T3vpPdABqLzOSd1c8Nrg%3D%3D",
  },
  {
    id: 7,
    name: "Tyranitar",
    power: 40,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537673143_tyranitar-pokemon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=n9xRJHV4s4plrLb2o6vzZDPyutBU3DTTvUutstTDq3oWO6KxpuHunIr4r%2F%2Bx2d2Rohc44A9CWQXQCp8QtFQaChIMW3vnodw%2FHdaNKD5k3FUZMJV7eBDFaRkW5WJVJm%2FcbraQJ5OYuPSyYmF5FOe4MYxZKXuMkKmz%2BeuTXUyOg3e6gvPJXoUc5krtnr7aLvY1aB06HowR3n%2Bz23o0Ybcv4A5rHyqNYfxNf5qzeXwY7ASfQ5uZXxLd%2F1dkO6AqzteQWkTRnDf4iCBqta%2BBjf8QZJ0aTVNtrnu%2FGYhQ75k8EMsgunFgjzlA2ZEiHH28Jw8PyJUtATpNofupPm5e44NL6g%3D%3D",
  },
  {
    id: 8,
    name: "Mega garchomp",
    power: 30,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537818860_mega-garchomp-pokemon-mega-garchomp.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=PzsRJP0x1N7iICY117V6hCBQp3Dpy4%2B9HZl2GoE%2BCEg358ueuhFYg%2FhOwE9b0TXK%2BG%2FAguUqBBZislqNS2v%2B9HnVuR7DyRWNWoZfLCQDLWysdrgqJRYS9A8lWQqDzt%2Fgqk3j0s0V5JjeWk6C3Rdc0k1hg9PzM5B5DvGwyvYHbY3szNsrBtQqEAcBW%2FmRlOR%2FAHJ4ftaXlZDwyH56rLd14fZwBOW2gQwxl%2B0Ist2z2V1u9nvmxLLbNnejGSQf7AmZoTTT29Q0WPDxDrVY8LUHBmoCUiMZa8JJXDT2vLCk3fP07k43%2FF%2FhagHmhjAkaFsX70EvX%2BEU9xZI6rZPtA%2BkBQ%3D%3D",
  },
  {
    id: 9,
    name: "Bastiodon",
    power: 20,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537875331_bastiodon-pokemon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=i9i013Mbd2I0PNEi%2BXOFNYVSpEsCfQFV5g8zlVppZlL5VGv37%2BftTiaL12CN%2Fc7%2FELcDuDmdQWxlx1UBEe1hVGjWx0n1ODY9t%2F%2BxXbLUt6n39sDXcrtsZb%2F7SHZZPW4sbmlQpAhToR4ts%2BA45XEqNOCne%2BFljmvb1W%2BUJvbVLVGUFiOm2p4Yi%2BAnpBstsD%2BfVr2vHs17ugnxOONElIn%2Fdo1bbgaMwneAYAotqVKUJAeiBKVlbmkWBJNOEjVEyFgnt1GoQ69oe92BlcpZ15DbJX6MUqDL3X8NHEsIrm5%2BqrCJcO%2BZWVkewsxsLUPFKO5PJWYqTlEukMsaRWlSJ9lqGQ%3D%3D",
  },
  {
    id: 10,
    name: "Baxcalibur",
    power: 100,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537906620_baxcalibur-pokemon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=TUIfOS%2BxIDOUR0YmdbQ3d3Mou2BGj51GNtAz8KA7YMXSFAcy15KWqQpRNw4h%2Bs7zW7gEfc6dhIyQeAdphBX%2BFw%2BCtyx3fs%2FKOV8AjXAxZhsIydnU4WAC1C6cQp%2BaFDYJS%2B%2BXKZ%2FwSNRYkdqA862gm84DXr7CbMB8iPZbOHhqBicTyW1kW6dLqDoPFlvvXmwxntF855qoD9Sv97cpd4ecexvYBqkLPX9o%2BhqWotOxC7EgikC4F8%2B%2FOqtrIZfVzAfHayfqOniKBj6QZ3KC0nENtkRtZ1kEsLlYJj8csUYJg1pSSZ6P8CyEqgC2QnRP94cnwkhZBhcyHebTn9vr1qTncQ%3D%3D",
  },
  {
    id: 11,
    name: "Dracozolt",
    power: 90,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537974514_dracozolt-pokemon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=a2urIkaTLB4JSx40IOQqiGsWhCrBEEsCKdFz45ihdwsoLyDSy7quZ%2B8bezrgqOc6ZNNB70wce8Neb7LyvtlaXDJozbGjxPoplVdl%2BVWmkJwh3W9Ay7qHlez4Wo1IzPN8EkX4gzahQs7UuB3%2BfjK8OjucME6iHxHmIvhHGbH7%2FOQ7UdJ1zEt2pKvJJLzwEwL4ztt1NHT6V1R4U9fiX%2FVfNr52FpvU7SdyRKoeBxsqQpsUFq1oeqFBcWhJkkkoIQmkVU4PejYKv6mV70Q%2Fqru9Jh0s9sJA%2FZgo%2BcYQRkODfP2%2FhWYHCSx07ZR%2F0%2FCTlRRi%2FcAak5vMjtPsrjAeV8IsHQ%3D%3D",
  },
  {
    id: 12,
    name: "Lapras",
    power: 80,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739538005050_lapras-pok%C3%83%C2%A9mon.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=Uv%2F95rZi3SyIwfWjoTBPNAehwK3iOrmf4mg%2BVovjRMetgkmNcQtH8sYrkl%2Bwkkmq7Q027F%2BOTz20xhli%2FBhr%2FjorZd0nvX8fdxVlVbr45ne%2Bd7JG2LK1Z4vKBDpB%2BqR3fSXluzvs4%2B06iZLt2zAM0RrpoFByQl2HPjvTm7f9WXMkXSzbURX7%2FCFP6tQB6YrDPO8E1%2BbdRqQvO6jHBV52WyqSKWWX9EkdeZSvkS6PvbKs5ad3uQ4StDnazet%2F4RwuVz3BXFBIp8QqlMss09ozJcvhs50DENe6ry%2BvTaMPO9jRB24WgkJiwzpMqe24qr7fHPKY6RYYJKnsDLzI4zmU6g%3D%3D",
  },
  {
    id: 13,
    name: "Leafeon",
    power: 70,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739538031357_leafeon-leafeon-the-rock.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=riWP2wYGfkug1Rmx48EZmrQNyZ59n%2FjMz9yjwgFqqItFSMzjJIIrUm9FwggfpnsyLQMeEpibx8XYSGsPJXATSqfaopVML8HOFk2WrYDQUaY0jUNHbQ5kqX1AXxAYU3NRx7hs9JD0b5MjfE7Y%2F4APfN%2BbtiooWtDPfCtxxApFKkeYMfNjiAFQsYXHaOVhMetLgK3HDgF9s5rvvw8sBObHJdKa6a%2FGa%2FKhrWHZni7hNPwH%2B8CnQ7%2BLCfPbX4QzEZie6qe6Oc0fCeTLF7IElYhdx12isDZsv9mPOPts2SJyEL8LqSpbmLZi3tG7cAn7KFSS%2BSK5J3%2FTTNNXwpPsFXBevg%3D%3D",
  },
  {
    id: 14,
    name: "Meganium growl",
    power: 60,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739538065133_meganium-growl.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=SaZ8SLmJ4QXq8Xp1MPnbObh4pI%2BhPVWxEzbvfpYt2YUvOvMrO3Zwnr5Ve0CWm6KuuCDMzn1P6BgJZaNBs809u1wdH%2FQ84K%2BMuBU%2B6yhZmG8Lm5o6KkqZMntz381xmfievMVK3qWdmoMEu3kuNo%2BiYOjWbXhvNVvRxC4eLDPX9mR8wNObNnglDU08o6Bv%2FYhikPepiWxraCAIgyTvR3Qkw80yH4RZgOHkRZkod%2BKS27ba75KQYDmQXP82BOrSz9t6mcgwDtbMh%2FKNhw98LxVvkuWtLVLY99Lr0nVp5RTGVrok%2BJIm1GtYl1Ova1ynHG90H73%2BP534WsINUDUOutgD4Q%3D%3D",
  },
  {
    id: 15,
    name: "Nidoking",
    power: 50,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739538143323_Nidoking.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=rTFrASWKp4u5RuBR1mDU1pV0lCM9EWskiNvMvTgy7sWyAs0exRLbZQGCdkaAGNdAPLTTnPSV%2FBrtIjkWQoZXnNVUEJ%2FzcEDBqhXk3uRwcdU0HDGjX9Er9xemkcNXz6ghdssiegGLtHAhUmUIKzd1G1wefNaaAVnQAnXILKEznbnD5zO1PBNyb6VbMQuShO3QM3zecyyf7%2B%2BrxARZAf3cW0YOZoKBiVEmw1ZfRqcboj2TGbiJiLAYVnHVwUaaxTcbqh7bumLfnNEdRJ0%2BDJ9NMZZ7flXLbWZhODKUIjXOMgR3%2Fz8ph3ABZpp9Vve2JBoC6qv%2F1w%2BNp5sVZUcHVlxB2A%3D%3D",
  },
  {
    id: 16,
    name: "Feraligatr.",
    power: 40,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739538186687_pokemon-feraligatr.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=JAgPxJIpH8fzSClrLzY0TwU%2BmSFhPZBmoU3sR6D1DJLtsQPk76sp%2FpQdUXwti9yqCuZmMdKodN3S7t0H5pESroVzsHlxbRsQ6hUZBxB2xZOpr0dUnKfOdSEVRWSq2wNhnoZr02rLoxGXs%2B0auSlYMFYr2%2BHMCk%2BA8elAWNv9NU50jsQoylO3mFd%2BOKu6YjX0aW6izQ%2B5KeZrSF6Av73b296NakFkvtFdHa3kfSbxTMLTF1MdhGcOcUAyBUFhvVCgObc0G2lbqOHoWlI0ZnQ5iPx5JXbHYc28fzFS6hQ8O%2F4JXLJ1i%2B42iE74eVkdlQ1MDvEqandw%2BtNnWBQq3XsI8A%3D%3D",
  },
  {
    id: 17,
    name: "Roserade",
    power: 30,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739538266898_roserade-pok%C3%83%C2%A9mon-roserade.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=SWDkmGRt%2FVeJpIyucMSMaAJ%2BCWb%2FWFccpDA1ajv%2FAyrhWJIHbfTDPvnaRhyEGLFy93sTiaiwneAFor0JuN9KUSrbbSCguKxoyK7ZlewKmzI1vNxp0jFbTGQCDVeb05AWE%2BWjDODECcRrZ8kQpfA4lZIh3vQW7sCBR7AvBNNa%2FY%2B8Ru%2BMdk0nZk5PT%2B2JlNSbwkj0Gn3G5b98MWeAEVbaW7L23%2FqT6gMHRB3zfAV%2Fr4LmACuZ3sPCA8II8QiHKJFNMEjATKrwKVAiXXd631lOnZpqIAjOnumz1WWS8U9mo35QDpX0uzqtVpFh5ncuv%2F0Cq3hw08xB1Fvl%2FLf24glQOg%3D%3D",
  },
  //
  {
    id: 18,
    name: "Tropius meganium",
    power: 20,
    image:
      "https://storage.googleapis.com/pokemon-27d43.firebasestorage.app/images/1739537718344_tropius-meganium.gif?GoogleAccessId=firebase-adminsdk-fbsvc%40pokemon-27d43.iam.gserviceaccount.com&Expires=16730319600&Signature=Y6fzO4Q%2FJWmsEXasrZAA%2BnhFizR7WfghYVoUWs9sOqHbKNzd%2B%2ButzD9ZElKdz9brV6uqsKei1He%2FfcUIuQupPmjsnPMErEYKaMOv%2FpkqcKFknL0FFYI0RHlnH5Q%2Fcalb1FewOSQx28oCRB5GRuH7rB58WFmwJm%2BVwBm4%2F8ZyJLHrUe6SoW9TSKcRkZ%2Fj24sYjTnYL%2FIcDEhK1W0BIgN1lh3DlJkLlR8lMLhcwRuoRRdi4Np8p0IUANPbNOBN7IhaHb9R8fYZi52b7AVVQ13WAV99ud7USSnfc%2Bfb1naqWzthOfJKgrUwd0fG8Hg4WmVaEHNcD%2BfNLjTnlRrVcamgvg%3D%3D",
  },
];

router.get("/", (req, res) => {
  res.json(cards);
});

export default router;
