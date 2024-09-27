// import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const toCurrency = (val) => {
  // eslint-disable-next-line no-undef
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);
};

const ListEditorHeader = (saldo) => {
  return (
    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#015953' }}>
      <View style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.saldoTextTitle}>Fijo + Corrido</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.FijosCorridos.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.FijosCorridos.limpio)}</Text>
      </View>
      <View style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.saldoTextTitle}>Parles</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Parles.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Parles.limpio)}</Text>
      </View>
      <View style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.saldoTextTitle}>Centenas</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Centenas.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Centenas.limpio)}</Text>
      </View>
      <View style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.saldoTextTitle}>Total</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Total.bruto)}</Text>
        <Text style={styles.saldoTextNumber}>{toCurrency(saldo.Total.limpio)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  saldoTextTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  saldoTextNumber: {
    color: 'white',
  },
});

export default ListEditorHeader;
