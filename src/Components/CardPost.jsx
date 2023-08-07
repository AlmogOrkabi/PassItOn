import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../Styles';

export default function CardPost({ itemName, description, category, photos, status, creationDate, itemLocation_id }) {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: photos[0] }} />
      <Card.Content>
        <Title>{itemName}</Title>
        <Paragraph>{description}</Paragraph>
        <Paragraph>Category: {category}</Paragraph>
        <Paragraph>Status: {status}</Paragraph>
        <Paragraph>Created on: {creationDate}</Paragraph>
        <Paragraph>Location ID: {itemLocation_id}</Paragraph>
      </Card.Content>
    </Card>
  );
}



