import React, { PropsWithChildren } from 'react';
import { KeyMap, KeyDescriptor } from "../hooks/useHotkeys";
import { groupBy, objToArray } from '../utils';

const HotKeysGroup:
  React.FC<PropsWithChildren<{ groupName: string }>> = ({ groupName, children }) => {
  return (
    <div>
      <h1>{groupName}</h1>
      {children}
    </div>
  );
}

const HotKeysList = ({ hotkeysList }: { hotkeysList: KeyDescriptor[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Keys</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {
          hotkeysList.map(keyDescriptor => {
            return <tr key={keyDescriptor.name}>
              <td>{keyDescriptor.name}</td>
              <td>{JSON.stringify(keyDescriptor.keys)}</td>
              <td>{keyDescriptor.description}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  );
}

export const HotKeysSidebar = ({ keyMap }: { keyMap: KeyMap }) => {
  const hotKeysList = objToArray(keyMap);
  const byGroupName = groupBy<KeyDescriptor>(keyDescriptor => {
    return keyDescriptor.group || 'No Group';
  });
  const groups = byGroupName(hotKeysList);

  return (
    <>
      {Object.keys(groups).map(groupName => {
        return (
          <HotKeysGroup key={groupName} groupName={groupName}>
            <HotKeysList hotkeysList={groups[groupName]}/>
          </HotKeysGroup>
        )
      })}
    </>
  );
}