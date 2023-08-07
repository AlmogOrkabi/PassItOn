import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../Styles';

export default function CardPost({ post }) {

  console.log("POST ==>>", post)

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: post.photos[0].url }} />
      <Card.Content>
        <Title>{post.itemName}</Title>
        <Paragraph>{post.description}</Paragraph>
        <Paragraph>קטגוריה: {post.category}</Paragraph>
        <Paragraph>סטטוס: {post.status}</Paragraph>
        <Paragraph>תאריך פרסום: {post.creationDate}</Paragraph>
        <Paragraph>כתובת: {post.address.simplifiedAddress || post.address.notes}</Paragraph>
      </Card.Content>
    </Card>
  );
}



