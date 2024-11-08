import { unkownTrackImageUri } from "@/constants/images"
import { TouchableHighlight, View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { StyleSheet } from "react-native"
import { colors, fontSize } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player"
import { Entypo, Ionicons } from '@expo/vector-icons'
import LoaderKit from 'react-native-loader-kit'

export type TracksListItemProps = {
    track: Track,
    onTrackSelect: (track: Track) => void
}

export const TracksListItem = ({ track, onTrackSelect: handleTrackSelect }: TracksListItemProps) => {
    const { playing } = useIsPlaying();
    const isActiveTrack = useActiveTrack()?.url === track.url;

    return <TouchableHighlight onPress={() => handleTrackSelect(track)}>
        <View style={styles.trackItemContainer}>
            {/* Album Image */}
            <View>
                <FastImage
                    source={{
                        uri: track.artwork ?? unkownTrackImageUri,
                        priority: FastImage.priority.normal
                    }}
                    style={{
                        ...styles.trackArtworkImage,
                        opacity: isActiveTrack ? 0.6 : 1,
                    }}

                />

                {isActiveTrack &&
                    (playing ?
                        <LoaderKit style={styles.trackPlayingIconIndicator} name="LineScaleParty" color={colors.icon} /> :
                        <Ionicons style={styles.trackPausedIconIndicator} name="play" size={24} color={colors.icon} />
                    )
                }
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {/* Music name + Artist */}
                <View style={{ width: '100%' }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.trackTitleText,
                            color: isActiveTrack ? colors.primary : colors.text
                        }}
                    >{track.title ?? "Unkown Track"}</Text>


                    <Text numberOfLines={1} style={styles.trackArtistText}>
                        {track.artist ?? "Unkown Artist"}
                    </Text>

                </View>
                <Entypo name='dots-three-horizontal' size={18} color={colors.icon} />
            </View>
        </View>

    </TouchableHighlight>
}

const styles = StyleSheet.create({
    trackItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20,
    },
    trackArtworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: fontSize.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtistText: {
        ...defaultStyles.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4
    },
    trackPlayingIconIndicator: {
        position: 'absolute',
        top: 18,
        left: 16,
        width: 16,
        height: 16,
    },
    trackPausedIconIndicator: {
        position: 'absolute',
        top: 14,
        left: 14,
    }
})