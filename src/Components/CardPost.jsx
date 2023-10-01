import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../Styles';
import { addressWithoutNumbers } from '../utils';
export default function CardPost({ post }) {


  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: post.photos[0].url }} />
      <Card.Content>
        <Title>{post.itemName}</Title>
        <Paragraph>{post.description}</Paragraph>
        <Paragraph>קטגוריה: {post.category}</Paragraph>
        <Paragraph>סטטוס: {post.status}</Paragraph>
        <Paragraph>תאריך פרסום: {new Date(post.creationDate).toLocaleDateString()}</Paragraph>
        {/* <Paragraph>כתובת: {post.address ? post.address.simplifiedAddress ? post.address.simplifiedAddress : post.address.notes ? post.address.notes : null : null}</Paragraph> */}
        <Paragraph>כתובת: {addressWithoutNumbers(post.address.simplifiedAddress || post.address.notes)}</Paragraph>
      </Card.Content>
    </Card>
  );
}



